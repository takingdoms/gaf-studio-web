import AutoSizedCanvas from "@/components/app/main-canvases/AutoSizedCanvas";
import { CanvasFunctions } from "@/lib/canvas/CanvasFunctions";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";
import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

export default function GridCanvas() {
  console.log('Rendering GridCanvas');

  const isVisible = useCanvasConfigStore((state) => state.mainCanvasLayerVisibility['GRID']);
  const gridSpacing = useCanvasConfigStore((state) => state.gridSpacing);
  const gridStyle = useCanvasConfigStore((state) => state.gridStyle);

  if (!isVisible) {
    return;
  }

  return (
    <AutoSizedCanvas onRender={(canvas, panX, panY) => {
      const ctx = new CanvasHelperContext(canvas);
      CanvasFunctions.drawGrid(ctx, gridSpacing, panX, panY, gridStyle);
    }} />
  );
}
