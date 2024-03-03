import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type WorkspacePaletteProps = {
  currentPalette: CurrentPalette;
};

export default function WorkspacePalette({ currentPalette }: WorkspacePaletteProps) {
  return (
    <div className="flex flex-col overflow-auto px-2 py-2">
      {/* <div className="flex flex-wrap"> */}
        <div className="mb-2">
          <CurrentPaletteInfo currentPalette={currentPalette} />
        </div>
        <div className="">
          <CurrentPalettePreview currentPalette={currentPalette} />
        </div>
      {/* </div> */}
    </div>
  );
}
