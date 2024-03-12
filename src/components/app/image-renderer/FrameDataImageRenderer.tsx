import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

// TODO put this in the canvas-config-store
const DRAW_FRAME_BOUNDARIES: 'below' | 'above' | null = 'below';

type FrameDataImageRendererProps = {
  frameData: VirtualFrameData;
  displace: boolean; // whether the x and y offsets are to displace the image
  contain: boolean;
  smoothing: boolean;
};

export default function FrameDataImageRenderer({
  frameData,
  displace,
  contain,
  smoothing,
}: FrameDataImageRendererProps) {
  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  const content = layers.map((layer, index) => {
    return (
      <div
        key={index}
        className="absolute flex justify-center items-center overflow-hidden"
        style={{
          left: displace ? -layer.xOffset : 0,
          top: displace ? -layer.yOffset : 0,
          right: displace ? undefined : 0,
          bottom: displace ? undefined : 0,
        }}
      >
        <ImageRenderer
          image={layer.layerData.imageResource.compiledImage}
          width={layer.width}
          height={layer.height}
          contain={contain}
          smoothing={smoothing}
        />
      </div>
    );
  });

  let boundaries: React.ReactNode | undefined = undefined;

  // disabled when !displace because without displacing the frame boundary display is redundant
  if (displace && DRAW_FRAME_BOUNDARIES !== null) {
    boundaries = (
      <div
        className="absolute box-border"
        style={{
          // TODO configurable colors and style
          border: '1px solid ' + (frameData.kind === 'single' ? 'blue' : 'red'),
          width: frameData.width,
          height: frameData.height,
          left: 0,
          top: 0,
        }}
      />
    );
  }

  return (
    <div
      className="relative"
      style={contain ? {
        width: frameData.width,
        height: frameData.height,
        maxWidth: '100%',
        maxHeight: '100%',
      } : {
        width: frameData.width,
        height: frameData.height,
      }}
    >
      {DRAW_FRAME_BOUNDARIES === 'below' && boundaries}
      {content}
      {DRAW_FRAME_BOUNDARIES === 'above' && boundaries}
    </div>
  );
}
