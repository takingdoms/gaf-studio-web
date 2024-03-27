import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { GafS } from '@/lib/state/workspace/workspace-context/gaf-workspace-helper';

export default function WorkspacePalette() {
  // console.log('Rendering WorkspacePalette');

  const currentPalette = GafS.useCurrentPalette();
  const setCurrentPalette = GafS.useSetCurrentPalette();

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
