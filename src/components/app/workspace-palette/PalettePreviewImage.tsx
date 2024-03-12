import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
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
    <div
      className="flex justify-center items-center"
      style={{
        width: width * scaleX,
        height: height * scaleY,
      }}
    >
      <ImageRenderer
        image={image}
        width={width}
        height={height}
        contain={false}
        smoothing={false}
        scaleX={scaleX}
        scaleY={scaleY}
      />
    </div>
  );
}
