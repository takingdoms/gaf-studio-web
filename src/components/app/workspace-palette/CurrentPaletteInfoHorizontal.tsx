import Anchor from '@/components/ui/anchor/Anchor';
import TextButton from '@/components/ui/button/TextButton';
import { PaletteUtils } from '@/lib/image/palette/palette-utils';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import React from 'react';

type CurrentPaletteInfoHorizontalProps = {
  currentPalette: CurrentPalette;
  setCurrentPalette: (pal: CurrentPalette) => void;
};

const thCls = 'px-1 py-0.5 text-left';
const tdCls = 'px-1 py-0.5';

// TODO reuse most of CurrentPaletteInfo (make a common component between the two)
export default function CurrentPaletteInfoHorizontal({
  currentPalette,
  setCurrentPalette,
}: CurrentPaletteInfoHorizontalProps) {
  // console.log('Rendering CurrentPaletteInfoHorizontal');

  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSelectFile = React.useCallback(async (file: File) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const palette = await PaletteUtils.loadFromPcxFile(file);
      const previewImage = PaletteUtils.compilePreviewImage(palette);

      setCurrentPalette({
        kind: 'custom-file',
        palette,
        originFile: file,
        previewImage,
      });
    } catch (err) {

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, setCurrentPalette]);

  const onClickChange = React.useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }, []);

  let file: string;
  let fileUrl: string | null;
  let name: string;

  switch (currentPalette.kind) {
    case 'raw':
      file = '(None)';
      fileUrl = null;
      name = currentPalette.customName ?? '(Raw bytes)';
      break;
    case 'custom-file':
      file = currentPalette.originFile.name;
      fileUrl = 'TODO';
      name = '(Custom file)';
      break;
    case 'world':
      file = currentPalette.fileName;
      fileUrl = 'TODO';
      name = currentPalette.world;
      break;
    default: throw new Error(``);
  }

  const change = (<>
    <TextButton
      label="Change palette"
      onClick={onClickChange}
    />
    <input
      ref={inputRef}
      style={{ display: 'none' }}
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
  </>);

  return (
    <div className="flex flex-col space-y-1.5 text-xs">

      <div className="flex space-x-4">
        <div className="flex items-center space-x-1">
          <div className="font-bold">File:</div>
          <div>
            {fileUrl === null ? (
              <span>{file}</span>
            ) : (
              <Anchor href={fileUrl} newTab>
                {file}
              </Anchor>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="font-bold">Name:</div>
          <div className="truncate">{name}</div>
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center space-x-1">
          <div className="font-bold">Options:</div>
          <div>{change}</div>
        </div>
      </div>

    </div>
  );
}
