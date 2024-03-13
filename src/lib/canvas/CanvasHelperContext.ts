export class CanvasHelperContext {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly pixelRatio: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    const dpr = window.devicePixelRatio || 1;
    const ctx = this.ctx as any;
    const bsr = ctx['webkitBackingStorePixelRatio']
      ?? ctx['mozBackingStorePixelRatio']
      ?? ctx['msBackingStorePixelRatio']
      ?? ctx['oBackingStorePixelRatio']
      ?? ctx['backingStorePixelRatio']
      ?? 1;

    this.pixelRatio = dpr / bsr;

    this.start();
  }

  private start() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getSharpPixel(pos: number, thickness: number) {
    if (thickness % 2 == 0) {
      return pos;
    }

    return pos + this.pixelRatio / 2;
  }

  pixelPerfectLine(x1: number, y1: number, x2: number, y2: number, strokeStyle: string) {
    this.ctx.save();
    this.ctx.beginPath();

    const thickness = 1;
    this.ctx.lineWidth = thickness * this.pixelRatio;

    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(this.getSharpPixel(x1, thickness), this.getSharpPixel(y1, thickness));
    this.ctx.lineTo(this.getSharpPixel(x2, thickness), this.getSharpPixel(y2, thickness));
    this.ctx.stroke();
    this.ctx.restore();
  }

  pixelPerfectRectangle(x: number, y: number, w: number, h: number, strokeStyle: string) {
    const originX = Math.floor(this.canvas.width / 2 - w / 2);
    const originY = Math.floor(this.canvas.height / 2 - h / 2);

    // console.log('origins:', originX, originY);

    this.ctx.save();
    this.ctx.beginPath();

    const thickness = 1;
    this.ctx.lineWidth = thickness * this.pixelRatio;
    this.ctx.strokeStyle = strokeStyle;

    /*if (useDash) {
      this.ctx.setLineDash([4]);
    }*/

    this.ctx.strokeRect(
      this.getSharpPixel(x + originX, thickness),
      this.getSharpPixel(y + originY, thickness),
      Math.floor(w),
      Math.floor(h),
    );
    this.ctx.restore();
  }

  drawImage(image: ImageData, xOffset: number, yOffset: number) {
    const originX = Math.floor(this.canvas.width / 2 - image.width / 2);
    const originY = Math.floor(this.canvas.height / 2 - image.height / 2);

    // console.log('origins:', originX, originY);

    this.ctx.putImageData(
      image,
      originX - xOffset,
      originY - yOffset,
    );
  }
}
