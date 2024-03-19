import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportFilesSelector from '@/components/app/importer/common/ImportFilesSelector';
import { FinalImportResult } from '@/components/app/importer/common/common-importing-types';
import ImportGafOrderSelector from '@/components/app/importer/gaf-importer/ImportGafOrderSelector';
import { GafImportingFunctions } from '@/components/app/importer/gaf-importer/gaf-importing-functions';
import { GafConfiguredFile, GafDecodedUserFile, GafDecodedUserFileOk, GafImportedFile } from '@/components/app/importer/gaf-importer/gaf-importing-types';
import ImportGafOptionsSelector from '@/components/app/importer/gaf-importer/options-selector/ImportGafOptionsSelector';
import { GAF_IMAGE_IMPORTERS } from '@/lib/importing/image-importers/gaf/gaf-image-importer';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { AsyncUtils } from '@/lib/utils/async-utils';
import { VirtualFrame, VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ImportGafWizardProps = {
  type: 'frames' | 'subframes';
  currentPalette: CurrentPalette;
  setCurrentPalette: (newPal: CurrentPalette) => void;
  onFinish: (result: FinalImportResult) => void;
  onAbort: () => void;
};

const AVAILABLE_IMPORTERS = GAF_IMAGE_IMPORTERS;
const SUPPORTED_FILE_EXTS: readonly string[] =
  AVAILABLE_IMPORTERS.flatMap((importer) => importer.supportedFileExts);

export default function ImportGafWizard({
  type,
  currentPalette,
  setCurrentPalette,
  onFinish,
  onAbort,
}: ImportGafWizardProps) {
  const [decodedUserFiles, setDecodedUserFiles] = React.useState<GafDecodedUserFile[]>();
  const [decoding, setDecoding] = React.useState(false);
  const [importedFiles, setImportedFiles] = React.useState<GafImportedFile[]>();
  const [importing, setImporting] = React.useState(false);
  const [showWorkspaceOptions, setShowWorkspaceOptions] = React.useState(true);
  const [finalResult, setFinalResult] = React.useState<FinalImportResult>();

  const onImportFiles = React.useCallback((decFiles: GafDecodedUserFileOk[]) => {
    if (decFiles.length === 0) {
      onAbort();
      return;
    }

    setImporting(true);

    const result = AsyncUtils.deferMap(decFiles, GafImportingFunctions.importImage);

    result
      .then(setImportedFiles)
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => setImporting(false));
  }, [onAbort]);

  const onFilesSelected = React.useCallback((files: File[]) => {
    if (files.length === 0) {
      onAbort();
      return;
    }

    setDecoding(true);

    const result = AsyncUtils.deferMap(files, (file) => {
      return GafImportingFunctions.decodeImage(file, currentPalette.palette, AVAILABLE_IMPORTERS);
    });

    result
      .then((decodedUserFiles) => {
        setDecodedUserFiles(decodedUserFiles);

        if (decodedUserFiles.length === 1) {
          const first = decodedUserFiles[0];

          if (first.error === undefined) {
            onImportFiles([first]);
          }
        }
      })
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => setDecoding(false));
  }, [onAbort, currentPalette, onImportFiles]);

  const onOptionsSelected = React.useCallback((configedFiles: GafConfiguredFile[]) => {
    const layers: VirtualFrameDataSingleLayer[] = configedFiles.map((file) => {
      if (file.importedFile.importerResult.kind === 'error') {
        throw new Error(`Imported files with errors shouldn't even reach here.`);
      }

      const imageResource = file.importedFile.importerResult.result.resource;
      const { width, height } = imageResource.compiledImage;

      return {
        width,
        height,
        xOffset: file.options.center ? Math.floor(width / 2) : 0,
        yOffset: file.options.center ? Math.floor(height / 2) : 0,
        transparencyIndex: file.options.transparencyIndex,
        unknown2: 0,
        unknown3: 0,

        key: Symbol(),
        kind: 'single',
        layerData: {
          kind: 'palette-idx',
          compress: file.options.compress,
          imageResource,
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
          key: Symbol(),
          duration: 10,
          frameData: layer,
        };
      });

      result = {
        type,
        frames,
      };
    }

    setFinalResult(result);
    onFinish(result);
  }, [type, setFinalResult, onFinish]);

  if (decoding) {
    return (
      <ImportBackground><ImportContent>
        Decoding...
      </ImportContent></ImportBackground>
    );
  }

  if (decodedUserFiles === undefined) {
    return (
      <ImportFilesSelector
        onFinish={onFilesSelected}
        onAbort={onAbort}
        acceptFiles={SUPPORTED_FILE_EXTS.map((ext) => `.${ext}`).join(',')}
      />
    );
  }

  if (importing) {
    return (
      <ImportBackground><ImportContent>
        Compiling...
      </ImportContent></ImportBackground>
    );
  }

  if (importedFiles === undefined) {
    return (
      <ImportGafOrderSelector
        decodedUserFiles={decodedUserFiles}
        onFinish={onImportFiles}
        onAbort={onAbort}
      />
    );
  }

  if (finalResult === undefined) {
    return (
      <ImportGafOptionsSelector
        importedFiles={importedFiles}
        setImportedFiles={setImportedFiles}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
        onFinish={onOptionsSelected}
        onAbort={onAbort}
        showWorkspaceOptions={showWorkspaceOptions}
        setShowWorkspaceOptions={setShowWorkspaceOptions}
      />
    );
  }

  // normally unreachable
  return (
    <ImportBackground><ImportContent>
      Finished! You can now close this wizard...
    </ImportContent></ImportBackground>
  );
}
