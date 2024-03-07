import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';

type WorkspacePaletteProps = {
  currentPalette: CurrentPalette;
  setCurrentPalette: (pal: CurrentPalette) => void;
};

export default function WorkspacePalette({
  currentPalette,
  setCurrentPalette,
}: WorkspacePaletteProps) {
  return (
    <div className="flex flex-col overflow-auto p-1">
      <div className={`flex flex-wrap`}>
        <div className="m-1">
          <CurrentPaletteInfo
            currentPalette={currentPalette}
            setCurrentPalette={setCurrentPalette}
          />
        </div>
        <div className="m-1">
          <CurrentPalettePreview currentPalette={currentPalette} />
        </div>
      </div>
    </div>
  );
}
