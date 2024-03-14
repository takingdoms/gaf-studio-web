import AutoSizedCanvas from "@/components/app/frame-canvases/AutoSizedCanvas";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";

export default function CrossCanvas() {
  console.log('Rendering CrossCanvas');

  // put these elsewhere
  function drawCross(ctx: CanvasHelperContext) {
    const crossGuideStyle = '#FF0000FF';

    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    const centerX = Math.floor(canvasW / 2);
    const centerY = Math.floor(canvasH / 2);

    ctx.pixelPerfectLine(centerX, 0, centerX, canvasH, crossGuideStyle);
    ctx.pixelPerfectLine(0, centerY, canvasW, centerY, crossGuideStyle);
  }

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);
      drawCross(ctx);
    }} />
  );
}
