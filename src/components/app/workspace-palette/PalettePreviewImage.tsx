import AbsoluteImageRenderer from '@/components/app/image-renderer/AbsoluteImageRenderer';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';

type PalettePreviewImageProps = {
  currentPalette: CurrentPalette;
  scaleX: number;
  scaleY: number;
};

export default function PalettePreviewImage({
  currentPalette,
  scaleX,
  scaleY,
}: PalettePreviewImageProps) {
  const { width, height, image } = currentPalette.previewImage;

  return (
    <AbsoluteImageRenderer
      image={image}
      width={width}
      height={height}
      contain={false}
      smoothing={false}
      scaleX={scaleX}
      scaleY={scaleY}
    />
  );
}
