import CurrentPaletteInfo from '@/components/app/workspace-palette/CurrentPaletteInfo';
import CurrentPalettePreview from '@/components/app/workspace-palette/CurrentPalettePreview';
import { GafWorkspaceStore } from '@/lib/react/workspace-store-context';

type WorkspacePaletteProps = {
  useGafStore: GafWorkspaceStore;
};

export default function WorkspacePalette({ useGafStore }: WorkspacePaletteProps) {
  // console.log('Rendering WorkspacePalette');

  const currentPalette = useGafStore((state) => state.currentPalette);
  const setCurrentPalette = useGafStore((state) => state.setCurrentPalette);

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
