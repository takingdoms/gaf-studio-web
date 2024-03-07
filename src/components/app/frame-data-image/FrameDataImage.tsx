import AbsoluteImageRenderer from '@/components/app/image-renderer/AbsoluteImageRenderer';
import { VirtualGafFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataImageProps = {
  frameData: VirtualGafFrameDataSingleLayer;
  contain: boolean;
  smoothing: boolean;
};

export default function FrameDataImage({
  frameData,
  contain,
  smoothing,
}: FrameDataImageProps) {
  return (
    <AbsoluteImageRenderer
      image={frameData.layerData.imageResource.compiledImage}
      width={frameData.width}
      height={frameData.height}
      contain={contain}
      smoothing={smoothing}
    />
  );
}
