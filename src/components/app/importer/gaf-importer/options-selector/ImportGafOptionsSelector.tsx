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

  const onClickNextAll = React.useCallback(() => {
    if (isReimporting)                return;
    if (currentConfigedFile === undefined)  return;

    setIsReimporting(true);
    HtmlUtils.justBlurIt();

    const currentImporter = currentFile.selectedImporter;
    const currentOptions = currentConfigedFile.options;

    const newImportedFiles = [...importedFiles];
    const newConfigedFiles = [...configedFiles];

    async function doNext(index: number): Promise<void> {
      setProgress(index);

      let nextFile = importedFiles[index];

      // TODO maybe this commented line is better? \/
      // if (nextFile.selectedImporter.importer !== currentImporter.importer) {
      if (nextFile.selectedImporter.importer.subKind !== currentImporter.importer.subKind) {
        // this is to prevent an incompatible importer from being applied to the next file
        // (ex: applying a PngImporter over a bmp file) - TODO test if this works as intended
        return;
      }

      const isImporterConfigDifferent = !ObjectUtils.deepCompare(
        nextFile.selectedImporter.config,
        currentImporter.config,
      );

      if (isImporterConfigDifferent) {
        nextFile = {
          ...nextFile,
          selectedImporter: currentImporter, // applies current importer settings to nextFile
        };
      }

      // the blocks below exists to update the old options with the current options early for the UI
      // and is "technically" unnecessary since these setters are called later anyway
      if (isImporterConfigDifferent) {
        newImportedFiles[index] = nextFile;
        setImportedFiles(newImportedFiles);
      }

      const oldConfigedFile = newConfigedFiles[index];
      if (oldConfigedFile !== undefined) {
        newConfigedFiles[index] = {
          importedFile: oldConfigedFile.importedFile,
          options: currentOptions, // applies current options to nextFile
        };
        setConfigedFiles(newConfigedFiles);
      }
      // ^^^ "technically" unnecessary blocks end here ^^^

      let newImportedFile = newImportedFiles[index];

      if (isImporterConfigDifferent) {
        newImportedFile = await AsyncUtils.defer(
          () => GafImportingFunctions.importImage(nextFile)
        );

        newImportedFiles[index] = newImportedFile;
      }

      newConfigedFiles[index] = {
        importedFile: newImportedFile,
        options: currentOptions, // applies current options to nextFile
      };

      if (newImportedFile.importerResult.kind === 'error') {
        alert('Errored out when compiling current image with the current Importer options!');
        return;
      }

      if (index === importedFiles.length - 1) {
        if (!isImporterConfigDifferent) {
          // no re-importing was done? then send it in to the onFinish!
          onFinish(newConfigedFiles.filter(MiscUtils.notEmpty));
        }

        return;
      }

      return doNext(index + 1);
    }

    const promise = AsyncUtils.defer(() => {
      return doNext(progress);
    });

    promise
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => {
        setIsReimporting(false);
        setImportedFiles(newImportedFiles);
        setConfigedFiles(newConfigedFiles);
      });
  }, [isReimporting, currentConfigedFile, onAbort, configedFiles, currentFile, importedFiles,
      setImportedFiles, progress, onFinish]);

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
            if (isReimporting)                return;
            if (currentConfigedFile === undefined)  return;

            if (progress === configedFiles.length - 1) {
              // if everything went as normal this array should be identical to the results array
              const nonErroredResults = configedFiles.filter(MiscUtils.notUndefined);
              onFinish(nonErroredResults);
            }
            else {
              setProgress(progress + 1);
            }
          }}
          onNextAll={onClickNextAll}
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
