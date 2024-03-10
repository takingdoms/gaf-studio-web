import Anchor from '@/components/ui/anchor/Anchor';
import TextButton from '@/components/ui/button/TextButton';
import { PaletteUtils } from '@/lib/image/palette/palette-utils';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import React from 'react';

type CurrentPaletteInfoProps = {
  currentPalette: CurrentPalette;
  setCurrentPalette: (pal: CurrentPalette) => void;
};

const thCls = 'px-1 py-0.5 text-left';
const tdCls = 'px-1 py-0.5';

export default function CurrentPaletteInfo({
  currentPalette,
  setCurrentPalette,
}: CurrentPaletteInfoProps) {
  // console.log('Rendering CurrentPaletteInfo');

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

  return (
    <table className="text-xs">
      <tbody>
        <tr>
          <th className={`${thCls}`}>File:</th>
          <td className={`${tdCls}`}>
            {fileUrl === null ? (
              <span>{file}</span>
            ) : (
              <Anchor href={fileUrl} newTab>
                {file}
              </Anchor>
            )}
          </td>
        </tr>
        <tr>
          <th className={`${thCls}`}>Name:</th>
          <td className={`${tdCls}`}>{name}</td>
        </tr>
        <tr>
          <th className={`${thCls}`}>Options:</th>
          <td className={`${tdCls}`}>
            <TextButton
              label="Change"
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
          </td>
        </tr>
      </tbody>
    </table>
  );
}
