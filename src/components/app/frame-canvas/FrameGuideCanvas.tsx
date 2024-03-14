import AutoSizedCanvas from "@/components/app/frame-canvas/AutoSizedCanvas";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";

type FrameGuideCanvasProps = {
  kind: 'below' | 'above';
  containerClassName?: string;
};

export default function FrameGuideCanvas({
  kind,
  containerClassName,
}: FrameGuideCanvasProps) {
  console.log('Rendering FrameGuideCanvas');

  // put these elsewhere
  function drawGrid(ctx: CanvasHelperContext) {
    const gridSpacing = 16;
    const gridLineStyle = '#0000000A';

    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    // for (let x = 0; x < Math.floor(canvasW / gridSpacing); x++) { // which is right?
    for (let x = 1; x <= Math.floor(canvasW / gridSpacing); x++) {
      const pos = x * gridSpacing;
      ctx.pixelPerfectLine(pos, 0, pos, canvasH, gridLineStyle); // x1, y1, x2, y2
    }

    // for (let y = 0; y < Math.floor(canvasH / gridSpacing); y++) { // which is right?
    for (let y = 1; y <= Math.floor(canvasH / gridSpacing); y++) {
      const pos = y * gridSpacing;
      ctx.pixelPerfectLine(0, pos, canvasW, pos, gridLineStyle); // x1, y1, x2, y2
    }
  }

  // put these elsewhere
  function drawCrossGuide(ctx: CanvasHelperContext) {
    // const crossGuideStyle = '#FFFF00FF';
    const crossGuideStyle = '#FF0000FF';

    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    const centerX = Math.floor(canvasW / 2);
    const centerY = Math.floor(canvasH / 2);

    // console.log('centers:', centerX, centerY);

    ctx.pixelPerfectLine(centerX, 0, centerX, canvasH, crossGuideStyle);
    ctx.pixelPerfectLine(0, centerY, canvasW, centerY, crossGuideStyle);
  }

  return (
    <div className={containerClassName}>
      <AutoSizedCanvas onRender={(canvas) => {
        const ctx = new CanvasHelperContext(canvas);

        drawGrid(ctx);
        drawCrossGuide(ctx);
      }} />
    </div>
  );
}
