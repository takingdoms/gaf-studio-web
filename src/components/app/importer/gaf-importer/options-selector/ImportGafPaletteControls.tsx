import CurrentPaletteInfoHorizontal from '@/components/app/workspace-palette/CurrentPaletteInfoHorizontal';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';

type ImportGafPaletteControlsProps = {
  currentPalette: CurrentPalette;
  setCurrentPalette: (newPal: CurrentPalette) => void;
};

export default function ImportGafPaletteControls({
  currentPalette,
  setCurrentPalette,
}: ImportGafPaletteControlsProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-gray-100 rounded px-2 py-0.5">
        <div className="text-center text-gray-500 font-bold text-xs mb-0.5">
          Current Palette:
        </div>

        <div className="flex items-center space-x-2">
          <CurrentPaletteInfoHorizontal
            currentPalette={currentPalette}
            setCurrentPalette={setCurrentPalette}
          />
          <CurrentPalettePreview currentPalette={currentPalette} />
        </div>
      </div>
    </div>
  );
}
