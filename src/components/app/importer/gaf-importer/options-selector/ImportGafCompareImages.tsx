import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import ImportPreviewWrapper from '@/components/app/importer/common/ImportPreviewWrapper';
import { DecodedUserImage } from '@/lib/importing/image-decoder';
import { ImporterResultWrapper } from '@/lib/importing/image-importer';
import { GafImporterResult } from '@/lib/importing/image-importers/gaf/gaf-image-importer';
import React from 'react';

type ImportGafCompareImagesProps = {
  decoded: DecodedUserImage;
  imported: ImporterResultWrapper<GafImporterResult>;
};

export default function ImportGafCompareImages({
  decoded,
  imported,
}: ImportGafCompareImagesProps) {
  const originalImage = React.useMemo(() => {
    return (
      <ImportPreviewWrapper
        imageData={decoded.image}
        imageWidth={decoded.metadata.width}
        imageHeight={decoded.metadata.height}
      />
    );
  }, [decoded]);

  const importedImage = React.useMemo(() => {
    if (imported.kind === 'error') {
      return (
        <div className="flex justify-center items-center text-center text-red-400">
          (Error)
        </div>
      );
    }

    return (
      <ImportPreviewWrapper
        imageData={imported.result.resource.compiledImage}
        imageWidth={decoded.metadata.width}
        imageHeight={decoded.metadata.height}
      />
    );
  }, [imported, decoded]);

  // TODO button to change the background somewhere

  return (
    <div className="flex space-x-2">
      <div className="flex-1 flex flex-col items-center">
        <div className="text-center text-slate-500 text-xs font-bold mb-0.5">Original</div>
        {originalImage}
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="text-center text-slate-500 text-xs font-bold mb-0.5">Converted</div>
        {importedImage}
      </div>
    </div>
  );
}
