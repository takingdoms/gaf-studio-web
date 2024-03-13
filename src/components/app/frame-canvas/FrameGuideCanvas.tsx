import AutoSizedCanvas from "@/components/app/frame-canvas/AutoSizedCanvas";
import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";

type FrameGuideCanvasProps = {
  kind: 'below' | 'above';
  boundsWidth: number;
  boundsHeight: number;
  containerClassName?: string;
};

export default function FrameGuideCanvas({
  kind,
  boundsWidth,
  boundsHeight,
  containerClassName,
}: FrameGuideCanvasProps) {
  console.log('Rendering FrameGuideCanvas');

  // put in the configs
  const snapToImage: boolean = true; // false = snap to canvas (aka 0,0)

  // put these elsewhere
  function drawGrid(ctx: CanvasHelperContext) {
    const gridSpacing = 16;
    const gridLineStyle = '#0000000A';

    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    let offsetX = 0, offsetY = 0;

    if (snapToImage) {
      offsetX = Math.floor((canvasW - boundsWidth) / 2);
      offsetY = Math.floor((canvasH - boundsHeight) / 2);
    }

    const startX = offsetX % gridSpacing;
    const startY = offsetY % gridSpacing;

    for (let x = startX; x <= canvasW; x += gridSpacing) {
      ctx.pixelPerfectLine(x, 0, x, canvasH, gridLineStyle); // Vertical lines
    }

    for (let y = startY; y <= canvasH; y += gridSpacing) {
      ctx.pixelPerfectLine(0, y, canvasW, y, gridLineStyle); // Horizontal lines
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

  // put these elsewhere
  function drawDimensionBoundary(ctx: CanvasHelperContext) {
    const boundaryStyle = '#0000FFEE';

    ctx.pixelPerfectRectangle(0, 0, boundsWidth, boundsHeight, boundaryStyle);
  }

  return (
    <div className={containerClassName}>
      <AutoSizedCanvas onRender={(canvas) => {
        const ctx = new CanvasHelperContext(canvas);

        drawGrid(ctx);
        drawCrossGuide(ctx);
        drawDimensionBoundary(ctx);
      }} />
    </div>
  );
}
