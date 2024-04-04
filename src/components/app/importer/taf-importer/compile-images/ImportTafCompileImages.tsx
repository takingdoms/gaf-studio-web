import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ImportHeader from '@/components/app/importer/common/ImportHeader';
import ImportOptionsStepper from '@/components/app/importer/common/ImportOptionsStepper';
import ImportTafConfigsForm from '@/components/app/importer/taf-importer/compile-images/ImportTafConfigsForm';
import ImportTafConfigsPrelude from '@/components/app/importer/taf-importer/compile-images/ImportTafConfigsPrelude';
import ImportTafPreviewResults from '@/components/app/importer/taf-importer/compile-images/ImportTafPreviewResults';
import TafImportOptionsForm from '@/components/app/importer/taf-importer/compile-images/TafImportOptionsForm';
import { TafImportingFunctions } from '@/components/app/importer/taf-importer/taf-importing-functions';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import TextButton from '@/components/ui/button/TextButton';
import LoadingOverlay from '@/components/ui/overlay/LoadingOverlay';
import { ArrayUtils } from '@/lib/utils/array-utils';
import { AsyncUtils } from '@/lib/utils/async-utils';
import React from 'react';

type ImportTafCompileImagesProps = {
  target: TafImporting.Target;
  okDecodedFiles: TafImporting.DecodedFileOk[];
  onNext: (results: TafImporting.ResultItem[]) => void;
  onAbort: () => void;
};

const DEFAULT_OPTIONS: TafImporting.ImportOptions = {
  center: false,
  compress: true,
};

export default function ImportTafCompileImages({
  target,
  okDecodedFiles,
  onNext,
  onAbort,
}: ImportTafCompileImagesProps) {
  if (okDecodedFiles.length === 0) {
    throw new Error(`No files.`);
  }

  const [configs, setConfigs] = React.useState<TafImporting.ConfigPair>();
  const [results, setResults] = React.useState<TafImporting.ResultItem[]>();
  const [showConfigsForm, setShowConfigsForm] = React.useState(false);
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const onChangeConfigs = React.useCallback((newConfigs: TafImporting.ConfigPair) => {
    setConfigs(newConfigs);

    if (newConfigs === undefined) {
      setResults(undefined);
      return;
    }

    setIsCompiling(true);

    const existingOptions = results?.map((result) => result.options);

    const promises = AsyncUtils.deferMap(okDecodedFiles, (decFile, index) => {
      const compilePromise = TafImportingFunctions.compileItem(
        target,
        decFile.result,
        newConfigs,
      );

      return compilePromise.then((resultPair) => {
        const previousOptions = existingOptions?.[index];
        const options = previousOptions ?? DEFAULT_OPTIONS;

        return {
          originalfile: decFile.file,
          decodedUserImage: decFile.result,
          importerResult: resultPair,
          options,
        } satisfies TafImporting.ResultItem;
      });
    });

    promises
      .then((results) => {
        setResults(results);
      })
      .catch((err) => {
        console.error(err); // theoretically impossible to reach
        onAbort();
      })
      .finally(() => setIsCompiling(false));
  }, [target, okDecodedFiles, onAbort, results]);

  const setCurrentResult = React.useCallback((newResult: TafImporting.ResultItem) => {
    if (results === undefined) {
      throw new Error(`No results. This should have been unreachable.`);
    }

    const newResults = ArrayUtils.update(results, progress, newResult);
    setResults(newResults);
  }, [results, progress]);

  const onClickApplyAll = React.useCallback(() => {
    if (results === undefined) {
      throw new Error(`No results. This should have been unreachable.`);
    }

    const current = results[progress];
    const options = current.options;

    const newResults: typeof results = results.map((result) => ({
      ...result,
      options,
    }));

    setResults(newResults);

    // TODO replace this alert with a subtle Toast at the bottom right or top right
    alert('Done!');
  }, [results, progress]);

  const onClickFinish = React.useCallback(() => {
    if (results === undefined) {
      return;
    }

    const okResults = results.filter((result) => {
      if (result.importerResult.target === 'taf-pair') {
        return result.importerResult.taf_1555.kind !== 'error'
          && result.importerResult.taf_4444.kind !== 'error';
      }

      if (result.importerResult.subFormat === 'taf_1555') {
        return result.importerResult.taf_1555.kind !== 'error';
      }

      return result.importerResult.taf_4444.kind !== 'error';
    });

    if (okResults.length === 0) {
      alert(`All images being imported have an error. Nothing will be imported.`);
      return;
    }

    onNext(okResults);
  }, [results, onNext]);

  if (configs === undefined || results === undefined) {
    return (
      <LoadingOverlay
        label="Compiling images..."
        isLoading={isCompiling}
      >
        <ImportTafConfigsPrelude
          target={target}
          onNext={onChangeConfigs}
          onAbort={onAbort}
        />
      </LoadingOverlay>
    );
  }

  const total = okDecodedFiles.length;
  const currentDecodedFile = okDecodedFiles[progress];
  const currentResult = results[progress];

  return (
    <LoadingOverlay
      label="Recompiling images..."
      isLoading={isCompiling}
    >
      <ImportBackground>
        <ImportContent>
          <div>
            <ImportHeader>
              <span className="mr-1">Conversion Methods</span>
              <TextButton
                label={showConfigsForm ? 'Collapse' : 'Expand'}
                onClick={() => setShowConfigsForm(!showConfigsForm)}
              />
            </ImportHeader>

            <div className={showConfigsForm ? '' : 'hidden'}>
              <div className="text-center text-xs text-slate-500 mb-2">
                (applies to all images being imported)
              </div>
              <ImportTafConfigsForm
                show1555={target.kind === 'taf-pair' || target.subFormat === 'taf_1555'}
                show4444={target.kind === 'taf-pair' || target.subFormat === 'taf_4444'}
                config1555={configs.config1555}
                config4444={configs.config4444}
                setConfig1555={(config1555) => onChangeConfigs({ ...configs, config1555 })}
                setConfig4444={(config4444) => onChangeConfigs({ ...configs, config4444 })}
              />
            </div>
          </div>
        </ImportContent>

        <ImportContent>
          <div>
            <ImportHeader>Result</ImportHeader>
            <ImportTafPreviewResults
              target={target}
              original={currentDecodedFile}
              results={currentResult.importerResult}
            />
          </div>

          <TafImportOptionsForm
            currentResult={currentResult}
            setCurrentResult={setCurrentResult}
            onClickApplyAll={onClickApplyAll}
          />
        </ImportContent>

        <ImportOptionsStepper
          current={progress}
          total={okDecodedFiles.length}
          onPrev={() => {
            if (isCompiling)    return;
            if (progress === 0) return;

            setProgress(progress - 1);
          }}
          onNext={() => {
            if (isCompiling)        return;
            if (progress === total) return;

            setProgress(progress + 1);
          }}
          onFinish={onClickFinish}
        />
      </ImportBackground>
    </LoadingOverlay>
  );
}
