import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type WorkspacePaletteProps = {
  currentPalette: CurrentPalette;
};

export default function WorkspacePalette({ currentPalette }: WorkspacePaletteProps) {
  return (
    <div className="flex flex-col overflow-auto p-1">
      <div className={`flex flex-wrap`}>
        <div className="m-1">
          <CurrentPaletteInfo currentPalette={currentPalette} />
        </div>
        <div className="m-1">
          <CurrentPalettePreview currentPalette={currentPalette} />
        </div>
      </div>
    </div>
  );
}
