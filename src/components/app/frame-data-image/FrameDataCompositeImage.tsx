import AbsoluteImageRendererContainer from '@/components/app/image-renderer/AbsoluteImageRendererContainer';
import AbsoluteImageRendererWrapper from '@/components/app/image-renderer/AbsoluteImageRendererWrapper';
import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { VirtualFrameDataMultiLayer } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataCompositeImageProps = {
  frameData: VirtualFrameDataMultiLayer;
  displace: boolean; // whether the x and y offsets are to displace the image
  contain: boolean;
  smoothing: boolean;
};

export default function FrameDataCompositeImage({
  frameData,
  displace,
  contain,
  smoothing,
}: FrameDataCompositeImageProps) {
  return (
    // TODO maybe draw a box around this container to guide where the "parent frame" is
    <AbsoluteImageRendererContainer
      width={frameData.width}
      height={frameData.height}
      contain={contain}
    >
      {frameData.layers.map((layer, index) => {
        return (
          <AbsoluteImageRendererWrapper
            key={index}
            xOffset={displace ? layer.xOffset : 0}
            yOffset={displace ? layer.yOffset : 0}
          >
            <ImageRenderer
              image={layer.layerData.imageResource.compiledImage}
              width={frameData.width}
              height={frameData.height}
              contain={contain}
              smoothing={smoothing}
            />
          </AbsoluteImageRendererWrapper>
        );
      })}
    </AbsoluteImageRendererContainer>
  );
}
