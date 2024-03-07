import { PaletteUtils } from '@/lib/image/palette/palette-utils';
import { CurrentPaletteFromCustomFile } from '@/lib/state/gaf-studio/current-palette';
import React from 'react';

type PreludePaletteSelectorProps = {
  selected: CurrentPaletteFromCustomFile | undefined;
  setSelected: (selected: CurrentPaletteFromCustomFile) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function PreludePaletteSelector({
  selected,
  setSelected,
  isLoading,
  setIsLoading,
}: PreludePaletteSelectorProps) {
  const onSelectFile = React.useCallback(async (file: File) => {
    if (isLoading || selected?.originFile === file) {
      return;
    }

    setIsLoading(true);

    try {
      const palette = await PaletteUtils.loadFromPcxFile(file);
      const previewImage = PaletteUtils.compilePreviewImage(palette);

      setSelected({
        kind: 'custom-file',
        palette,
        originFile: file,
        previewImage,
      });
    } catch (err) {

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, selected, setIsLoading, setSelected]);

  return (
    <div className="flex">
      <input
        type="file"
        onChange={(ev) => {
          ev.preventDefault();
          const files = ev.target.files;
          if (files && files.length === 1) {
            onSelectFile(files[0]);
          }
        }}
        accept=".pcx"
      />
    </div>
  );
}
