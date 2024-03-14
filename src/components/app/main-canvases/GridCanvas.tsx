import AutoSizedCanvas from "@/components/app/main-canvases/AutoSizedCanvas";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";

export default function GridCanvas() {
  console.log('Rendering GridCanvas');

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

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);
      drawGrid(ctx);
    }} />
  );
}
