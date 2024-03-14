import AutoSizedCanvas from "@/components/app/main-canvases/AutoSizedCanvas";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";
import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

export default function CrossCanvas() {
  console.log('Rendering CrossCanvas');

  const crossStyle = useCanvasConfigStore((state) => state.crossStyle);

  // put these elsewhere
  function drawCross(ctx: CanvasHelperContext) {
    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    const centerX = Math.floor(canvasW / 2);
    const centerY = Math.floor(canvasH / 2);

    ctx.pixelPerfectLine(centerX, 0, centerX, canvasH, crossStyle);
    ctx.pixelPerfectLine(0, centerY, canvasW, centerY, crossStyle);
  }

  return (
    <AutoSizedCanvas onRender={(canvas) => {
      const ctx = new CanvasHelperContext(canvas);
      drawCross(ctx);
    }} />
  );
}
