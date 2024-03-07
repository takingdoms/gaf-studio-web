import PalettePreviewImage from '@/components/app/workspace-palette/PalettePreviewImage';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';

type CurrentPalettePreviewProps = {
  currentPalette: CurrentPalette;
};

export default function CurrentPalettePreview({ currentPalette }: CurrentPalettePreviewProps) {
  const scale: number = 2;

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
          scaleX={scale}
          scaleY={scale}
        />
      </div>
    </div>
  );
}
