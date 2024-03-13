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
  const drawDisplacedRect = true;

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  // put these elsewhere
  function drawDimensionBoundary(
    ctx: CanvasHelperContext,
    width: number,
    height: number,
    xOffset: number,
    yOffset: number,
  ) {
    const boundaryStyle = '#FF00FFEE';

    ctx.pixelPerfectRectangle(-xOffset, -yOffset, width, height, boundaryStyle);
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

          ctx.drawImage(
            image,
            layer.xOffset,
            layer.yOffset,
          );

          if (drawDisplacedRect) {
            drawDimensionBoundary(
              ctx,
              layer.width,
              layer.height,
              layer.xOffset,
              layer.yOffset,
            );
          }
        }} />
      </div>
    );
  });
}
