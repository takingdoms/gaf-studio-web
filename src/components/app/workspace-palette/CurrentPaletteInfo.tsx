import Anchor from '@/components/ui/anchor/Anchor';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type CurrentPaletteInfoProps = {
  currentPalette: CurrentPalette;
};

const thCls = 'px-1 py-0.5 text-left';
const tdCls = 'px-1 py-0.5';

export default function CurrentPaletteInfo({ currentPalette }: CurrentPaletteInfoProps) {
  return (
    <table className="text-xs">
      <tbody>
        <tr>
          <th className={`${thCls}`}>File:</th>
          <td className={`${tdCls}`}>
            <Anchor href="TODO">
              ara_textures.pcx
            </Anchor>
          </td>
        </tr>
        <tr>
          <th className={`${thCls}`}>Name:</th>
          <td className={`${tdCls}`}>
            Aramon Units
          </td>
        </tr>
        <tr>
          <th className={`${thCls}`}>Origin:</th>
          <td className={`${tdCls}`}>
            <span>Auto-detected</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
