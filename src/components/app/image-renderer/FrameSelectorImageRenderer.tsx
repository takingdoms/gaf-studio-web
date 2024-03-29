import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { TafSubFormat } from '@/lib/main-format';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameSelectorImageRendererProps = {
  frameData: VirtualFrameData;
};

export default function FrameSelectorImageRenderer({ frameData }: FrameSelectorImageRendererProps) {
  const activeSubFormat: TafSubFormat = 'taf_4444' as TafSubFormat; // TODO

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  const content = layers.map((layer, index) => {
    let image: ImageData;

    if (layer.layerData.kind === 'raw-colors-pair') {
      image = activeSubFormat === 'taf_1555'
        ? layer.layerData.imageResource1555.compiledImage
        : layer.layerData.imageResource4444.compiledImage;
    }
    else {
      image = layer.layerData.imageResource.compiledImage
    }

    return (
      <div
        key={index}
        className="absolute inset-0 flex justify-center items-center overflow-hidden"
      >
        <ImageRenderer
          image={image}
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
