import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportOptionsStepper from '@/components/app/importer/common/ImportOptionsStepper';
import ImportGafWorkspaceOptions from '@/components/app/importer/gaf-importer/ImportGafWorkspaceOptions';
import { GafImportingFunctions } from '@/components/app/importer/gaf-importer/gaf-importing-functions';
import { GafConfiguredFile, GafImportedFile, GafSelectedImporter } from '@/components/app/importer/gaf-importer/gaf-importing-types';
import GafImportOptionsForm from '@/components/app/importer/gaf-importer/options-selector/GafImportOptionsForm';
import GafImporterOptionsControls from '@/components/app/importer/gaf-importer/options-selector/GafImporterOptionsControls';
import ImportGafCompareImages from '@/components/app/importer/gaf-importer/options-selector/ImportGafCompareImages';
import ImportGafConversionMessage from '@/components/app/importer/gaf-importer/options-selector/ImportGafConversionMessage';
import LoadingOverlay from '@/components/ui/overlay/LoadingOverlay';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { AsyncUtils } from '@/lib/utils/async-utils';
import { HtmlUtils } from '@/lib/utils/html-utils';
import { MiscUtils } from '@/lib/utils/misc-utils';
import { ObjectUtils } from '@/lib/utils/object-utils';
import React from 'react';

type ImportGafOptionsSelectorProps = {
  importedFiles: GafImportedFile[];
  setImportedFiles: (reimportedFiles: GafImportedFile[]) => void;
  currentPalette: CurrentPalette;
  setCurrentPalette: (newPal: CurrentPalette) => void;
  onAbort: () => void;
  onFinish: (configedFiles: GafConfiguredFile[]) => void;
};

export default function ImportGafOptionsSelector({
  importedFiles,
  setImportedFiles,
  currentPalette,
  setCurrentPalette,
  onAbort,
  onFinish,
}: ImportGafOptionsSelectorProps) {
  if (importedFiles.length === 0) {
    throw new Error(`No files.`);
  }

  const [isReimporting, setIsReimporting] = React.useState(false);
  const [configedFiles, setConfigedFiles] = React.useState<Array<GafConfiguredFile | undefined>>(
    importedFiles.map((next) => generateInitialConfig(next))
  );
  const [progress, setProgress] = React.useState(0);

  const currentFile = importedFiles[progress];
  const currentConfigedFile = configedFiles[progress];

  const setCurrentConfigedFile = React.useCallback((newConfigedFile: GafConfiguredFile | undefined) => {
    const newResults = [...configedFiles];
    newResults[progress] = newConfigedFile;
    setConfigedFiles(newResults);
  }, [configedFiles, progress]);

  const onChangeCurrentPalette = React.useCallback((newPal: CurrentPalette) => {
    if (isReimporting) {
      return;
    }

    setIsReimporting(true);
    HtmlUtils.justBlurIt();

    const updatedDecFiles: typeof importedFiles = importedFiles.map((importedFile) => {
      return {
        ...importedFile,
        selectedImporter: {
          ...importedFile.selectedImporter,
          config: {
            ...importedFile.selectedImporter.config,
            palette: newPal.palette,
          },
        },
      };
    });

    const promise = AsyncUtils.deferMap(updatedDecFiles, GafImportingFunctions.importImage);

    promise
      .then((updatedImportFiles) => {
        setImportedFiles(updatedImportFiles);
        setCurrentPalette(newPal);
      })
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => setIsReimporting(false));
  }, [isReimporting, setCurrentPalette, importedFiles, setImportedFiles, onAbort]);

  const onChangeSelectedImporter = React.useCallback((newSelectedImporter: GafSelectedImporter) => {
    if (isReimporting) {
      return;
    }

    setIsReimporting(true);
    HtmlUtils.justBlurIt();

    const newDecFile: typeof currentFile = {
      ...currentFile,
      selectedImporter: newSelectedImporter,
    };

    const promise = AsyncUtils.defer(() => GafImportingFunctions.importImage(newDecFile));

    promise
      .then((newImportedFile) => {
        const newImportedFiles = [...importedFiles];
        newImportedFiles[progress] = newImportedFile;
        setImportedFiles(newImportedFiles);

        if (newImportedFile.importerResult.kind === 'error') {
          setCurrentConfigedFile(undefined);
        }
        else {
          setCurrentConfigedFile({
            importedFile: newImportedFile,
            options: {
              center: currentConfigedFile?.options.center ?? false,
              compress: currentConfigedFile?.options.compress ?? false,
              transparencyIndex: newImportedFile.importerResult.result.transparencyIndex,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => setIsReimporting(false));
  }, [isReimporting, currentFile, importedFiles, progress, setImportedFiles, onAbort,
      currentConfigedFile, setCurrentConfigedFile]);

  const onClickApplyAllImporterOptions = React.useCallback(() => {
    if (isReimporting) {
      return;
    }

    setIsReimporting(true);
    HtmlUtils.justBlurIt();

    const failList: typeof importedFiles = [];
    const currentImporter = currentFile.selectedImporter;

    // TODO? eventually store this as the state, instead of importedFiles and configuedFiles?
    type Pair = {
      importedFile: GafImportedFile;
      configedFile: GafConfiguredFile | undefined;
    };

    const promises: Promise<Pair>[] = Array.from({ length: importedFiles.length }).map(async (_, index) => {
      const next = {
        importedFile: importedFiles[index],
        configedFile: configedFiles[index],
      };

      if (next.importedFile === currentFile) {
        return next;
      }

      // this is to prevent an incompatible importer from being applied to the next file
      // (ex: applying a PngImporter over a bmp file) - TODO test if this works as intended
      if (next.importedFile.selectedImporter.importer.subKind !== currentImporter.importer.subKind) {
        failList.push(next.importedFile);
        return next;
      }

      const isImporterConfigIdentical = ObjectUtils.deepCompare(
        next.importedFile.selectedImporter.config,
        currentImporter.config,
      );

      if (isImporterConfigIdentical) {
        return next;
      }

      let newImportedFile: GafImportedFile = {
        ...next.importedFile,
        selectedImporter: {
          ...next.importedFile.selectedImporter,
          config: currentImporter.config,
        },
      };

      newImportedFile = await AsyncUtils.defer(
        () => GafImportingFunctions.importImage(newImportedFile)
      );

      const newConfigedFile = newImportedFile.importerResult.kind === 'error'
        ? undefined
        : {
          importedFile: newImportedFile,
          options: {
            center: next.configedFile?.options.center ?? false,
            compress: next.configedFile?.options.compress ?? false,
            transparencyIndex: newImportedFile.importerResult.result.transparencyIndex,
          },
        };

      return {
        importedFile: newImportedFile,
        configedFile: newConfigedFile,
      };
    });

    Promise.all(promises)
      .then((result) => {
        const importedFiles = result.map((r) => r.importedFile);
        const configedFiles = result.map((r) => r.configedFile);

        setImportedFiles(importedFiles);
        setConfigedFiles(configedFiles);
        // TODO show failList on screen

        // TODO replace this alert with a subtle Toast at the bottom right or top right
        alert('Done!');
      })
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => {
        setIsReimporting(false);
      });
  }, [currentFile, importedFiles, setImportedFiles, isReimporting, setIsReimporting, configedFiles,
      onAbort]);

  const onClickApplyAllFrameOptions = React.useCallback(() => {
    if (isReimporting)                      return;
    if (currentConfigedFile === undefined)  return;

    const newConfigedFiles: typeof configedFiles = configedFiles.map((next) => {
      if (next === currentConfigedFile || next === undefined) {
        return next;
      }

      return {
        ...next,
        options: currentConfigedFile.options,
      };
    });

    setConfigedFiles(newConfigedFiles);

    // TODO replace this alert with a subtle Toast at the bottom right or top right
    alert('Done!');
  }, [isReimporting, currentConfigedFile, configedFiles]);

  const onClickFinish = React.useCallback(() => {
    const nonErroredResults = configedFiles.filter(MiscUtils.notUndefined);
    onFinish(nonErroredResults);
  }, [configedFiles, onFinish]);

  return (
    <LoadingOverlay isLoading={isReimporting ? 'Recompiling...' : false}>
      <ImportBackground>
        <ImportGafWorkspaceOptions
          currentPalette={currentPalette}
          setCurrentPalette={onChangeCurrentPalette}
        />

        <ImportContent header="Importer Options">
          <GafImporterOptionsControls
            selectedImporter={currentFile.selectedImporter}
            setSelectedImporter={onChangeSelectedImporter}
            onClickApplyAll={onClickApplyAllImporterOptions}
          />
        </ImportContent>

        <ImportContent header="Frame Options">
          <ImportGafCompareImages
            decoded={currentFile.decodedUserImage}
            imported={currentFile.importerResult}
          />

          <ImportGafConversionMessage resultWrapper={currentFile.importerResult} />

          {currentConfigedFile !== undefined && (
            <GafImportOptionsForm
              importedFile={currentFile}
              currentConfig={currentConfigedFile}
              setCurrentConfig={setCurrentConfigedFile}
              onClickApplyAll={onClickApplyAllFrameOptions}
            />
          )}
        </ImportContent>

        <ImportOptionsStepper
          current={progress}
          total={configedFiles.length}
          onPrev={() => {
            if (isReimporting)  return;
            if (progress === 0) return;

            setProgress(progress - 1);
          }}
          onNext={() => {
            if (isReimporting)                          return;
            if (progress === configedFiles.length - 1)  return;

            setProgress(progress + 1);
          }}
          onFinish={onClickFinish}
        />
      </ImportBackground>
    </LoadingOverlay>
  );
}

function generateInitialConfig(
  importedFile: GafImportedFile,
): GafConfiguredFile | undefined {
  if (importedFile.importerResult.kind === 'error') {
    return undefined;
  }

  return {
    importedFile: importedFile,
    options: {
      center: false,
      compress: false,
      transparencyIndex: importedFile.importerResult.result.transparencyIndex,
    },
  };
}
