import FrameDataImageContainer from '@/components/app/frame-data-image/FrameDataImageContainer';
import FrameDataImageLayer from '@/components/app/frame-data-image/FrameDataImageLayer';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

type PalettePreviewImageProps = {
  currentPalette: CurrentPalette;
  scale: number;
};

export default function PalettePreviewImage({
  currentPalette,
  scale,
}: PalettePreviewImageProps) {
  const size = 16 * scale;

  return (
    <FrameDataImageContainer
      width={size}
      height={size}
    >
      <FrameDataImageLayer
        image={currentPalette.previewImage}
        width={size}
        height={size}
      />
    </FrameDataImageContainer>
  );
}
