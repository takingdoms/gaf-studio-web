import ImportPreviewWrapper from '@/components/app/importer/common/ImportPreviewWrapper';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import { ImporterResultWrapper } from '@/lib/importing/image-importer';
import { TafImporterResult } from '@/lib/importing/image-importers/taf/taf-image-importer';
import { TafSubFormat } from '@/lib/main-format';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ImportTafPreviewResultsProps = {
  target: TafImporting.Target;
  original: TafImporting.DecodedFileOk;
  results: TafImporting.ImporterResult;
};

export default function ImportTafPreviewResults({
  target,
  original,
  results,
}: ImportTafPreviewResultsProps) {
  if (target.kind === 'taf-solo') {
    if (results.target !== 'taf-solo') {
      throw new Error(`Target mismatch.`);
    }

    return (
      <ImportTafPreviewResultsSolo
        original={original}
        importerResult={results.subFormat === 'taf_1555' ? results.taf_1555 : results.taf_4444}
        subFormat={results.subFormat}
      />
    );
  }

  return (
    <ImportTafPreviewResultsPair
      original={original}
      results={results}
    />
  );
}

function ImportTafPreviewResultsSolo({
  original,
  importerResult,
  subFormat,
}: {
  original: TafImporting.DecodedFileOk;
  importerResult: ImporterResultWrapper<TafImporterResult<'argb1555' | 'argb4444'>>;
  subFormat: TafSubFormat;
}) {
  const importedImage = React.useMemo(() => {
    if (importerResult.kind === 'error') {
      return (
        <div className="flex justify-center items-center text-center text-red-400">
          (Error)
        </div>
      );
    }

    return (
      <ImportPreviewWrapper
        imageData={importerResult.result.resource.compiledImage}
        imageWidth={original.result.metadata.width}
        imageHeight={original.result.metadata.height}
        wrapperHeight={250}
      />
    );
  }, [original, importerResult]);

  // TODO show the lossy/lossless conversion message stuff somewhere?

  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-slate-500 text-xs font-bold mb-0.5">Original</div>
      <ImportPreviewWrapper
        imageData={original.result.image}
        imageWidth={original.result.metadata.width}
        imageHeight={original.result.metadata.height}
        wrapperHeight={125}
      />
      <Icons.ArrowDown className="mt-1 text-gray-400" />

      <div className="text-center text-slate-500 text-xs font-bold mb-0.5">
        {subFormat === 'taf_1555' ? '1555' : '4444'}
      </div>
      {importedImage}
    </div>
  );
}

function ImportTafPreviewResultsPair({
  original,
  results,
}: {
  original: TafImporting.DecodedFileOk;
  results: TafImporting.ImporterResult;
}) {
  if (results.target !== 'taf-pair') {
    throw new Error(`Target mismatch.`);
  }

  const result1555 = results.taf_1555;

  const importedImage1555 = React.useMemo(() => {
    if (result1555.kind === 'error') {
      return (
        <div className="flex justify-center items-center text-center text-red-400">
          (Error)
        </div>
      );
    }

    return (
      <ImportPreviewWrapper
        imageData={result1555.result.resource.compiledImage}
        imageWidth={original.result.metadata.width}
        imageHeight={original.result.metadata.height}
        wrapperHeight={250}
      />
    );
  }, [original, result1555]);

  const result4444 = results.taf_4444;

  const importedImage4444 = React.useMemo(() => {
    if (result4444.kind === 'error') {
      return (
        <div className="flex justify-center items-center text-center text-red-400">
          (Error)
        </div>
      );
    }

    return (
      <ImportPreviewWrapper
        imageData={result4444.result.resource.compiledImage}
        imageWidth={original.result.metadata.width}
        imageHeight={original.result.metadata.height}
        wrapperHeight={250}
      />
    );
  }, [original, result4444]);

  // TODO show the lossy/lossless conversion message stuff somewhere?

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="text-center text-slate-500 text-xs font-bold mb-0.5">Original</div>
        <ImportPreviewWrapper
          imageData={original.result.image}
          imageWidth={original.result.metadata.width}
          imageHeight={original.result.metadata.height}
          wrapperHeight={125}
        />
        <Icons.ArrowFork className="mt-1 rotate-180 text-gray-400" />
      </div>

      <div className="flex space-x-2">
        <div className="flex-1 flex flex-col items-center">
          <div className="text-center text-slate-500 text-xs font-bold mb-0.5">1555</div>
          {importedImage1555}
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="text-center text-slate-500 text-xs font-bold mb-0.5">4444</div>
          {importedImage4444}
        </div>
      </div>
    </div>
  );
}
