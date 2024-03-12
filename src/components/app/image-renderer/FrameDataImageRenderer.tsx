import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

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
  const frameBoundary = useCanvasConfigStore((state) => state.frameBoundary);
  const fbBorderSingle = useCanvasConfigStore((state) => state.frameBoundaryBorderStyleSingle);
  const fbBorderMulti = useCanvasConfigStore((state) => state.frameBoundaryBorderStyleMulti);

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
  if (displace && frameBoundary !== null) {
    boundaries = (
      <div
        className="absolute box-border"
        style={{
          border: frameData.kind === 'single' ? fbBorderSingle : fbBorderMulti,
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
      {frameBoundary === 'below' && boundaries}
      {content}
      {frameBoundary === 'above' && boundaries}
    </div>
  );
}
