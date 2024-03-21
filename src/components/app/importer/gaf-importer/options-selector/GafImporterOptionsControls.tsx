import { GafSelectedImporter } from '@/components/app/importer/gaf-importer/gaf-importing-types';
import PngGafImageImporterControls from '@/components/app/importer/gaf-importer/options-selector/importers/PngGafImageImporterControls';
import { GafImageImporters } from '@/lib/importing/image-importers/gaf/gaf-image-importer';
import React from 'react';

type GafImporterOptionsControlsProps<T extends GafImageImporters> = {
  selectedImporter: GafSelectedImporter<T>;
  setSelectedImporter: (newValue: GafSelectedImporter<T>) => void;
};

export default function GafImporterOptionsControls<T extends GafImageImporters>({
  selectedImporter,
  setSelectedImporter,
}: GafImporterOptionsControlsProps<T>) {
  const onChangeConfig = React.useCallback((config: GafSelectedImporter<T>['config']) => {
    setSelectedImporter({
      ...selectedImporter,
      config,
    });
  }, [selectedImporter, setSelectedImporter]);

  const content = React.useMemo(() => {
    if (selectedImporter.importer.subKind === 'png' || selectedImporter.importer.subKind === 'bmp') {
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

      <div>
        {content}
      </div>
    </div>
  );
}
