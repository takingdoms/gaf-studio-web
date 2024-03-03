import PalettePreviewImage from '@/components/app/workspace-palette/PalettePreviewImage';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type CurrentPalettePreviewProps = {
  currentPalette: CurrentPalette;
};

export default function CurrentPalettePreview({ currentPalette }: CurrentPalettePreviewProps) {
  const scaleX: number = 2;
  const scaleY: number = 2;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-1">
        <span className="font-bold text-xs">
          {/* Preview{scale === 1 ? '' : ` (x${scale})`} */}
          Preview (x2)
        </span>
      </div>

      <div className="flex justify-center">
        <PalettePreviewImage
          currentPalette={currentPalette}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </div>
    </div>
  );
}
