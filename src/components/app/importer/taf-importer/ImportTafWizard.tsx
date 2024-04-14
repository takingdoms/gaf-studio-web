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
import { ImporterResultWrapper } from '@/lib/importing/image-importer';
import { TafImporterResult } from '@/lib/importing/image-importers/taf/taf-image-importer';
import { BaseVirtualGafFrameData, VirtualFrame, VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ImportTafWizardProps = ({
  type: 'frames' | 'subframes';
  replacing?: never;
  onFinish: (result: FinalImportResult) => void;
} | {
  type?: never;
  replacing: VirtualFrameDataSingleLayer;
  onFinish: (result: VirtualFrameDataSingleLayer) => void;
}) & {
  target: TafImporting.Target;
  onAbort: () => void;
};

const AVAILABLE_IMAGE_DECODERS = [
  BMP_IMAGE_DECODER,
  PNG_IMAGE_DECODER,
] as const;

export default function ImportTafWizard({
  type,
  replacing,
  onFinish,
  target,
  onAbort,
}: ImportTafWizardProps) {
  /// Length should always be === 1 when in 'replace' mode
  const [loading, setLoading] = React.useState<string>();
  const [decodedFiles, setDecodedFiles] = React.useState<TafImporting.DecodedFile[]>();
  const [okDecodedFiles, setOkDecodedFiles] = React.useState<TafImporting.DecodedFileOk[]>();

  const doFinish = React.useCallback((results: TafImporting.ResultItem[]) => {
    const layers: VirtualFrameDataSingleLayer[] = results.map((result) => {
      const { width, height } = result.decodedUserImage.metadata;
      const base: BaseVirtualGafFrameData = {
        width,
        height,
        xOffset: result.options.center ? Math.floor(width / 2) : 0,
        yOffset: result.options.center ? Math.floor(height / 2) : 0,
        transparencyIndex: 0,
        unknown2: 0,
        unknown3: 0,
      };

      if (target.kind === 'taf-solo') {
        if (result.importerResult.target !== 'taf-solo') {
          throw new Error(`Target mismatch.`);
        }

        let importerResult: ImporterResultWrapper<TafImporterResult<'argb1555' | 'argb4444'>>;

        if (target.subFormat === 'taf_1555') {
          if (result.importerResult.subFormat !== 'taf_1555') throw new Error(`Target mismatch.`);
          importerResult = result.importerResult.taf_1555;
        }
        else {
          if (result.importerResult.subFormat !== 'taf_4444') throw new Error(`Target mismatch.`);
          importerResult = result.importerResult.taf_4444;
        }

        if (importerResult.kind === 'error') {
          throw new Error(`Imported files with errors shouldn't even reach here.`);
        }

        return {
          ...base,
          kind: 'single',
          layerData: {
            kind: 'raw-colors',
            imageResource: importerResult.result.resource,
          },
        } satisfies VirtualFrameDataSingleLayer;
      }

      if (result.importerResult.target !== 'taf-pair') {
        throw new Error(`Target mismatch.`);
      }

      const result1555 = result.importerResult.taf_1555;
      const result4444 = result.importerResult.taf_4444;

      if (result1555.kind === 'error' || result4444.kind === 'error') {
        throw new Error(`Imported files with errors shouldn't even reach here.`);
      }

      return {
        ...base,
        kind: 'single',
        layerData: {
          kind: 'raw-colors-pair',
          imageResource1555: result1555.result.resource,
          imageResource4444: result4444.result.resource,
        },
      } satisfies VirtualFrameDataSingleLayer;
    });

    if (replacing !== undefined) {
      let result = layers[0];

      result = {
        ...result,
        unknown2: replacing.unknown2,
        unknown3: replacing.unknown3,
      };

      onFinish(result);
      return;
    }

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
          duration: 2, // TODO!!!!
          frameData: layer,
        };
      });

      result = {
        type,
        frames,
      };
    }

    onFinish(result);
  }, [replacing, type, target, onFinish]);

  const onSelectFiles = React.useCallback((files: File[]) => {
    if (loading !== undefined) {
      return;
    }

    if (files.length === 0) {
      onAbort();
      return;
    }

    if (replacing !== undefined && files.length > 1) {
      files = [files[0]];
    }

    setLoading('Decoding files...');

    const promises = files.map((file) => {
      return TafImportingFunctions.decodeImage(file, AVAILABLE_IMAGE_DECODERS);
    });

    Promise.all(promises)
      .then((decodedFiles) => {
        setDecodedFiles(decodedFiles);

        if (decodedFiles.length === 1) {
          const first = decodedFiles[0];
          if (first.result.kind === 'ok') {
            setOkDecodedFiles([{
              file: first.file,
              result: first.result.ok,
            }]);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        // TODO
      })
      .finally(() => setLoading(undefined));
  }, [replacing, loading, onAbort]);

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
        isReplacing={replacing !== undefined}
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
      target={target}
      okDecodedFiles={okDecodedFiles}
      onNext={doFinish}
      onAbort={onAbort}
    />
  );
}
