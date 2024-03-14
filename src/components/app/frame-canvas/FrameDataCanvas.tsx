import AutoSizedCanvas from '@/components/app/frame-canvas/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { Debug } from '@/lib/debug/debug';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameDataCanvasProps = {
  frameData: VirtualFrameData;
  containerClassName?: string;
};

export default function FrameDataCanvas({
  frameData,
  containerClassName,
}: FrameDataCanvasProps) {
  console.log('Rendering FrameDataCanvas');

  // put this in a config
  const shouldDrawBounds = true;
  const shouldDrawOriginBounds = true;

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

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

  // put these elsewhere
  function drawOriginBounds(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
  ) {
    const boundaryStyle = '#0000FFEE';

    const centerX = Math.floor(ctx.canvas.width / 2);
    const centerY = Math.floor(ctx.canvas.height / 2);

    ctx.pixelPerfectRectangle(
      centerX,
      centerY,
      width,
      height,
      boundaryStyle,
    );
  }

  return layers.map((layer, index) => {
    return (
      <div
        key={index}
        className={containerClassName}
      >
        <AutoSizedCanvas onRender={(canvas) => {
          const ctx = new CanvasHelperContext(canvas);
          const image = layer.layerData.imageResource.compiledImage;

          // console.log('Canvas dims:', ctx.canvas.width, ctx.canvas.height);
          // console.log('FrameD dims:', image.width, image.height);
          Debug.assertEq(layer.width, image.width);
          Debug.assertEq(layer.height, image.height);

          const centerX = Math.floor(ctx.canvas.width / 2);
          const centerY = Math.floor(ctx.canvas.height / 2);

          ctx.drawImage(
            image,
            centerX - layer.xOffset,
            centerY - layer.yOffset,
          );

          if (shouldDrawBounds) {
            drawBounds(ctx, layer.width, layer.height, layer.xOffset, layer.yOffset);
          }

          if (shouldDrawOriginBounds) {
            drawOriginBounds(ctx, layer.width, layer.height);
          }
        }} />
      </div>
    );
  });
}
