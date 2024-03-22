import { GafSelectedImporter } from '@/components/app/importer/gaf-importer/gaf-importing-types';
import PngGafImageImporterControls from '@/components/app/importer/gaf-importer/options-selector/importers/PngGafImageImporterControls';
import TextButton from '@/components/ui/button/TextButton';
import { BMP_GAF_IMAGE_IMPORTER } from '@/lib/importing/image-importers/gaf/bmp-gaf-image-importer';
import { GafImageImporters } from '@/lib/importing/image-importers/gaf/gaf-image-importer';
import { PNG_GAF_IMAGE_IMPORTER } from '@/lib/importing/image-importers/gaf/png-gaf-image-importer';
import React from 'react';

type GafImporterOptionsControlsProps<T extends GafImageImporters> = {
  selectedImporter: GafSelectedImporter<T>;
  setSelectedImporter: (newValue: GafSelectedImporter<T>) => void;
  onClickApplyAll: () => void;
};

export default function GafImporterOptionsControls<T extends GafImageImporters>({
  selectedImporter,
  setSelectedImporter,
  onClickApplyAll,
}: GafImporterOptionsControlsProps<T>) {
  const onChangeConfig = React.useCallback((config: GafSelectedImporter<T>['config']) => {
    setSelectedImporter({
      ...selectedImporter,
      config,
    });
  }, [selectedImporter, setSelectedImporter]);

  const content = React.useMemo(() => {
    if (
      selectedImporter.importer.subKind === PNG_GAF_IMAGE_IMPORTER.subKind ||
      selectedImporter.importer.subKind === BMP_GAF_IMAGE_IMPORTER.subKind
    ) {
      return (
        <PngGafImageImporterControls
          config={selectedImporter.config}
          setConfig={(c) => onChangeConfig(c as GafSelectedImporter<T>['config'])}
        />
      );
    }

    console.error(`Couldn't find component for:`);
    console.error(selectedImporter);

    return (
      <div className="text-center text-slate-500 text-sm">
        (No controls available)
      </div>
    );
  }, [selectedImporter, onChangeConfig]);

  return (
    <div className="flex flex-col">
      <div className="text-center text-gray-500 text-xs mb-2">
        <span className="font-bold">{selectedImporter.importer.title}</span>
      </div>

      <div className="mb-2">
        {content}
      </div>

      <div className="text-center text-xs">
        <TextButton
          label="Apply to all images"
          onClick={onClickApplyAll}
        />
      </div>
    </div>
  );
}
