import AutoSizedCanvas from "@/components/app/main-canvases/AutoSizedCanvas";
import { CanvasFunctions } from "@/lib/canvas/CanvasFunctions";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";
import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

export default function CrossCanvas() {
  // console.log('Rendering CrossCanvas');

  const isVisible = useCanvasConfigStore((state) => state.mainCanvasLayerVisibility['CROSS']);
  const crossStyle = useCanvasConfigStore((state) => state.crossStyle);

  if (!isVisible) {
    return;
  }

  return (
    <AutoSizedCanvas onRender={(canvas, panX, panY) => {
      const ctx = new CanvasHelperContext(canvas);
      CanvasFunctions.drawCross(ctx, panX, panY, crossStyle);
    }} />
  );
}
