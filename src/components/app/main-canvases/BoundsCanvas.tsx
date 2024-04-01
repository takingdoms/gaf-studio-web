import AutoSizedCanvas from '@/components/app/main-canvases/AutoSizedCanvas';
import { CanvasFunctions } from '@/lib/canvas/CanvasFunctions';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type BoundsCanvasProps = {
  frameData: VirtualFrameData;
};

export default function BoundsCanvas({ frameData }: BoundsCanvasProps) {
  console.log('Rendering BoundsCanvas');

  const isVisible = useCanvasConfigStore((state) => state.mainCanvasLayerVisibility['BOUNDS']);
  const boundsStyle = useCanvasConfigStore((state) => state.boundsStyle);

  if (!isVisible) {
    return;
  }

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);

      layers.forEach((layer) => {
        CanvasFunctions.drawBounds(
          ctx,
          layer.width,
          layer.height,
          layer.xOffset,
          layer.yOffset,
          boundsStyle,
        );
      });
    }} />
  );
}
