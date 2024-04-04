import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import { FinalImportResult } from '@/components/app/importer/common/common-importing-types';
import ImportTafOrderFilterImages from '@/components/app/importer/taf-importer/ImportTafOrderFilterImages';
import ImportTafSelectFiles from '@/components/app/importer/taf-importer/ImportTafSelectFiles';
import ImportTafCompileImages from '@/components/app/importer/taf-importer/compile-images/ImportTafCompileImages';
import { TafImportingFunctions } from '@/components/app/importer/taf-importer/taf-importing-functions';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import { BMP_IMAGE_DECODER } from '@/lib/importing/image-decoders/bmp-image-decoder';
import { PNG_IMAGE_DECODER } from '@/lib/importing/image-decoders/png-image-decoder';
import { VirtualFrame, VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ImportTafWizardProps = {
  type: 'frames' | 'subframes';
  onFinish: (result: FinalImportResult) => void;
  onAbort: () => void;
};

const AVAILABLE_IMAGE_DECODERS = [
  // BMP_IMAGE_DECODER,
  PNG_IMAGE_DECODER,
] as const;

export default function ImportTafWizard({
  type,
  onFinish,
  onAbort,
}: ImportTafWizardProps) {
  /// Length should always be === 1 when in 'replace' mode
  const [loading, setLoading] = React.useState<string>();
  const [decodedFiles, setDecodedFiles] = React.useState<TafImporting.DecodedFile[]>();
  const [okDecodedFiles, setOkDecodedFiles] = React.useState<TafImporting.DecodedFileOk[]>();

  const doFinish = React.useCallback((results: TafImporting.ResultItem[]) => {
    const layers: VirtualFrameDataSingleLayer[] = results.map((result) => {
      const result1555 = result.importerResults.taf_1555;
      const result4444 = result.importerResults.taf_4444;

      if (result1555.kind === 'error' || result4444.kind === 'error') {
        throw new Error(`Imported files with errors shouldn't even reach here.`);
      }

      const { width, height } = result.decodedUserImage.metadata;

      return {
        width,
        height,
        xOffset: result.options.center ? Math.floor(width / 2) : 0,
        yOffset: result.options.center ? Math.floor(height / 2) : 0,
        transparencyIndex: 0,
        unknown2: 0,
        unknown3: 0,

        kind: 'single',
        layerData: {
          kind: 'raw-colors-pair',
          imageResource1555: result1555.result.resource,
          imageResource4444: result4444.result.resource,
        },
      };
    });

    let result: FinalImportResult;

    if (type === 'subframes') {
      result = {
        type,
        subframes: layers,
      };
    }
    else {
      const frames: VirtualFrame[] = layers.map((layer) => {
        return {
          duration: 10, // TODO!!!!
          frameData: layer,
        };
      });

      result = {
        type,
        frames,
      };
    }

    onFinish(result);
  }, [type, onFinish]);

  const onSelectFiles = React.useCallback((files: File[]) => {
    if (loading !== undefined) {
      return;
    }

    if (files.length === 0) {
      onAbort();
      return;
    }

    setLoading('Decoding files...');

    const promises = files.map((file) => {
      return TafImportingFunctions.decodeImage(file, AVAILABLE_IMAGE_DECODERS);
    });

    Promise.all(promises)
      .then(setDecodedFiles)
      .catch((err) => {
        console.error(err);
        // TODO
      })
      .finally(() => setLoading(undefined));
  }, [loading, onAbort]);

  if (loading) {
    return (
      <ImportBackground>
        <ImportContent>
          {loading}
        </ImportContent>
      </ImportBackground>
    );
  }

  if (decodedFiles === undefined) {
    return (
      <ImportTafSelectFiles
        onAbort={onAbort}
        onNext={onSelectFiles}
        availableDecoders={AVAILABLE_IMAGE_DECODERS}
      />
    );
  }

  if (okDecodedFiles === undefined) {
    return (
      <ImportTafOrderFilterImages
        decodedFiles={decodedFiles}
        onNext={setOkDecodedFiles}
        onAbort={onAbort}
      />
    );
  }

  return (
    <ImportTafCompileImages
      okDecodedFiles={okDecodedFiles}
      onNext={doFinish}
      onAbort={onAbort}
    />
  );
}
