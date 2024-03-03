import FrameDataImageContainer from '@/components/app/frame-data-image/FrameDataImageContainer';
import FrameDataImageLayer from '@/components/app/frame-data-image/FrameDataImageLayer';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

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
    <FrameDataImageContainer
      width={width * scaleX}
      height={height * scaleY}
    >
      <FrameDataImageLayer
        image={image}
        width={width}
        height={height}
        keepAspectRatio={false}
        scaleX={scaleX}
        scaleY={scaleY}
      />
    </FrameDataImageContainer>
  );
}
