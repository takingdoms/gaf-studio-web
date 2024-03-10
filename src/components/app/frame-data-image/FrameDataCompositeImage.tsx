import AbsoluteImageRendererContainer from '@/components/app/image-renderer/AbsoluteImageRendererContainer';
import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { VirtualFrameDataMultiLayer } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataCompositeImageProps = {
  frameData: VirtualFrameDataMultiLayer;
  contain: boolean;
  smoothing: boolean;
};

export default function FrameDataCompositeImage({
  frameData,
  contain,
  smoothing,
}: FrameDataCompositeImageProps) {
  return (
    <AbsoluteImageRendererContainer
      width={frameData.width}
      height={frameData.height}
      contain={contain}
    >
      {frameData.layers.map((layer, index) => {
        return (
          <div
            key={index}
            className="absolute inset-0 flex justify-center items-center overflow-hidden"
          >
            <ImageRenderer
              image={layer.layerData.imageResource.compiledImage}
              width={frameData.width}
              height={frameData.height}
              contain={contain}
              smoothing={smoothing}
            />
          </div>
        );
      })}
    </AbsoluteImageRendererContainer>
  );
}
