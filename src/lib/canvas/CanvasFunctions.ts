import { CanvasHelperContext } from "@/lib/canvas/CanvasHelperContext";

export namespace CanvasFunctions {
  export function drawGrid(
    ctx: CanvasHelperContext,
    spacing: number,
    panX: number,
    panY: number,
    style: string,
  ) {
    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    for (let x = 0; x <= Math.floor(canvasW / spacing); x++) {
      const pos = x * spacing + (panX % spacing);
      ctx.pixelPerfectLine(pos, 0, pos, canvasH, style); // x1, y1, x2, y2
    }

    for (let y = 0; y <= Math.floor(canvasH / spacing); y++) {
      const pos = y * spacing + (panY % spacing);
      ctx.pixelPerfectLine(0, pos, canvasW, pos, style); // x1, y1, x2, y2
    }
  }

  export function drawCross(ctx: CanvasHelperContext, panX: number, panY: number, style: string) {
    const canvasW = ctx.canvas.width;
    const canvasH = ctx.canvas.height;

    const centerX = Math.floor(canvasW / 2) + panX;
    const centerY = Math.floor(canvasH / 2) + panY;

    ctx.pixelPerfectLine(centerX, 0, centerX, canvasH, style);
    ctx.pixelPerfectLine(0, centerY, canvasW, centerY, style);
  }

  export function drawBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
    xOffset: number,
    yOffset: number,
    panX: number,
    panY: number,
    style: string,
  ) {
    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX - xOffset + panX,
      centerY - yOffset + panY,
      width,
      height,
      style,
    );
  }

  export function drawOriginBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
    panX: number,
    panY: number,
    style: string,
  ) {
    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX + panX,
      centerY + panY,
      width,
      height,
      style,
    );
  }
}
