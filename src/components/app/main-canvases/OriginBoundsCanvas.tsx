import AutoSizedCanvas from '@/components/app/main-canvases/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type OriginBoundsCanvasProps = {
  frameData: VirtualFrameData;
};

export default function OriginBoundsCanvas({ frameData }: OriginBoundsCanvasProps) {
  console.log('Rendering OriginBoundsCanvas');

  // put these elsewhere
  function drawOriginBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
  ) {
    const boundaryStyle = '#0000FFEE';

    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX,
      centerY,
      width,
      height,
      boundaryStyle,
    );
  }

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);

      layers.forEach((layer) => {
        drawOriginBounds(ctx, layer.width, layer.height);
      });
    }} />
  );
}
