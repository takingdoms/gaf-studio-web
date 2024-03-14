import AutoSizedCanvas from '@/components/app/frame-canvases/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type BoundsCanvasProps = {
  frameData: VirtualFrameData;
};

export default function BoundsCanvas({ frameData }: BoundsCanvasProps) {
  console.log('Rendering BoundsCanvas');

  // put these elsewhere
  function drawBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
    xOffset: number,
    yOffset: number,
  ) {
    const boundaryStyle = '#FF00FFEE';

    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX - xOffset,
      centerY - yOffset,
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
        drawBounds(ctx, layer.width, layer.height, layer.xOffset, layer.yOffset);
      });
    }} />
  );
}
