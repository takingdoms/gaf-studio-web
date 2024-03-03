import FrameDataImageContainer from '@/components/app/frame-data-image/FrameDataImageContainer';
import FrameDataImageLayer from '@/components/app/frame-data-image/FrameDataImageLayer';
import { VirtualGafFrameDataMultiLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';

type FrameDataCompositeImageProps = {
  frameData: VirtualGafFrameDataMultiLayer;
};

export default function FrameDataCompositeImage({ frameData }: FrameDataCompositeImageProps) {
  return (
    <FrameDataImageContainer
      width={frameData.width}
      height={frameData.height}
    >
      {frameData.layers.map((layer, index) => {
        return (
          <FrameDataImageLayer
            key={index}
            image={layer.layerData.imageResource.compiledImage}
            width={layer.width}
            height={layer.height}
            keepAspectRatio
          />
        );
      })}
    </FrameDataImageContainer>
  );
}
