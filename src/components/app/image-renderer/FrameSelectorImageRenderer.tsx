import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameSelectorImageRendererProps = {
  frameData: VirtualFrameData;
};

export default function FrameSelectorImageRenderer({ frameData }: FrameSelectorImageRendererProps) {
  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  const content = layers.map((layer, index) => {
    return (
      <div
        key={index}
        className="absolute inset-0 flex justify-center items-center overflow-hidden"
      >
        <ImageRenderer
          image={layer.layerData.imageResource.compiledImage}
          width={layer.width}
          height={layer.height}
          contain={true}
          smoothing={false}
        />
      </div>
    );
  });

  return (
    <div
      className="relative"
      style={{
        width: frameData.width,
        height: frameData.height,
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      {content}
    </div>
  );
}
