import AutoSizedCanvas from '@/components/app/main-canvases/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type BoundsCanvasProps = {
  frameData: VirtualFrameData;
};

export default function BoundsCanvas({ frameData }: BoundsCanvasProps) {
  console.log('Rendering BoundsCanvas');

  const boundsStyle = useCanvasConfigStore((state) => state.boundsStyle);

  // put these elsewhere
  function drawBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
    xOffset: number,
    yOffset: number,
  ) {
    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX - xOffset,
      centerY - yOffset,
      width,
      height,
      boundsStyle,
    );
  }

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);

      layers.forEach((layer) => {
        drawBounds(ctx, layer.width, layer.height, layer.xOffset, layer.yOffset);
      });
    }} />
  );
}
