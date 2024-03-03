import FrameDataImageContainer from '@/components/app/frame-data-image/FrameDataImageContainer';
import FrameDataImageLayer from '@/components/app/frame-data-image/FrameDataImageLayer';
import { VirtualGafFrameDataSingleLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';

type FrameDataImageProps = {
  frameData: VirtualGafFrameDataSingleLayer;
};

export default function FrameDataImage({ frameData }: FrameDataImageProps) {
  return (
    <FrameDataImageContainer
      width={frameData.width}
      height={frameData.height}
    >
      <FrameDataImageLayer
        image={frameData.layerData.wrappedImages.compiledImage}
        width={frameData.width}
        height={frameData.height}
        keepAspectRatio
      />
    </FrameDataImageContainer>
  );
}
