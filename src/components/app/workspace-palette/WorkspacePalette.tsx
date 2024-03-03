import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { PALETTE_PREVIEW_MODE } from '@/lib/constants';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type WorkspacePaletteProps = {
  currentPalette: CurrentPalette;
};

export default function WorkspacePalette({ currentPalette }: WorkspacePaletteProps) {
  const flexCls = PALETTE_PREVIEW_MODE === 'square' ? '' : 'flex-col';

  return (
    <div className="flex flex-col overflow-auto px-2 pt-2">
      <div className={`flex ${flexCls} flex-wrap`}>
        <div className="mr-2 mb-2">
          <CurrentPaletteInfo currentPalette={currentPalette} />
        </div>
        <div className="mb-2">
          <CurrentPalettePreview currentPalette={currentPalette} />
        </div>
      </div>
    </div>
  );
}
