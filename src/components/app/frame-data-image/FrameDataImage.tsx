import AbsoluteImageRenderer from '@/components/app/image-renderer/AbsoluteImageRenderer';
import { VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataImageProps = {
  frameData: VirtualFrameDataSingleLayer;
  displace: boolean; // whether the x and y offsets are to displace the image
  contain: boolean;
  smoothing: boolean;
};

export default function FrameDataImage({
  frameData,
  displace,
  contain,
  smoothing,
}: FrameDataImageProps) {
  return (
    <AbsoluteImageRenderer
      image={frameData.layerData.imageResource.compiledImage}
      width={frameData.width}
      height={frameData.height}
      xOffset={frameData.xOffset}
      yOffset={frameData.yOffset}
      displace={displace}
      contain={contain}
      smoothing={smoothing}
    />
  );
}
