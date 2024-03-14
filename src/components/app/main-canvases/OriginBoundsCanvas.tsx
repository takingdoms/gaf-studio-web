import AutoSizedCanvas from '@/components/app/main-canvases/AutoSizedCanvas';
import { CanvasFunctions } from '@/lib/canvas/CanvasFunctions';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type OriginBoundsCanvasProps = {
  frameData: VirtualFrameData;
};

export default function OriginBoundsCanvas({ frameData }: OriginBoundsCanvasProps) {
  console.log('Rendering OriginBoundsCanvas');

  const originBoundsStyle = useCanvasConfigStore((state) => state.originBoundsStyle);

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);

      layers.forEach((layer) => {
        CanvasFunctions.drawOriginBounds(ctx, layer.width, layer.height, originBoundsStyle);
      });
    }} />
  );
}
