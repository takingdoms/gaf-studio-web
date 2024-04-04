import ImportPreviewWrapper from '@/components/app/importer/common/ImportPreviewWrapper';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type ImportTafPreviewResultsProps = {
  original: TafImporting.DecodedFileOk;
  results: TafImporting.ImporterResultPair;
};

export default function ImportTafPreviewResults({
  original,
  results,
}: ImportTafPreviewResultsProps) {
  const result1555 = results.taf_1555;
  const result4444 = results.taf_4444;

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
  }, [result1555, original]);

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
  }, [result4444, original]);

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
