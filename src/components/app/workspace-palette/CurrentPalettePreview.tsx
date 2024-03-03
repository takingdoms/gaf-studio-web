import PalettePreviewImage from '@/components/app/workspace-palette/PalettePreviewImage';
import { PALETTE_PREVIEW_MODE } from '@/lib/constants';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type CurrentPalettePreviewProps = {
  currentPalette: CurrentPalette;
};

export default function CurrentPalettePreview({ currentPalette }: CurrentPalettePreviewProps) {
  const scaleX: number = PALETTE_PREVIEW_MODE === 'square' ? 2 : 1;
  const scaleY: number = PALETTE_PREVIEW_MODE === 'square' ? 2 : 10;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-1">
        <span className="font-bold text-xs">
          Preview
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
