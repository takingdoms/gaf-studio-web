import Anchor from '@/components/ui/anchor/Anchor';
import TextButton from '@/components/ui/button/TextButton';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type CurrentPaletteInfoProps = {
  currentPalette: CurrentPalette;
};

const thCls = 'px-1 py-0.5 text-left';
const tdCls = 'px-1 py-0.5';

export default function CurrentPaletteInfo({ currentPalette }: CurrentPaletteInfoProps) {
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
              onClick={() => {}}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
