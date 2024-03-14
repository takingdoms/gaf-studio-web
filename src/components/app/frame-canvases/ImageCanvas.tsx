import AutoSizedCanvas from '@/components/app/frame-canvases/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { Debug } from '@/lib/debug/debug';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type ImageCanvasProps = {
  frameData: VirtualFrameData;
};

export default function ImageCanvas({
  frameData,
}: ImageCanvasProps) {
  console.log('Rendering ImageCanvas');

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return layers.map((layer, index) => (
    <AutoSizedCanvas
      key={index}
      onRender={(canvas) => {
        const ctx = new CanvasHelperContext(canvas);
        const image = layer.layerData.imageResource.compiledImage;

        Debug.assertEq(layer.width, image.width);
        Debug.assertEq(layer.height, image.height);

        const centerX = Math.floor(ctx.canvas.width / 2);
        const centerY = Math.floor(ctx.canvas.height / 2);

        ctx.drawImage(image, centerX - layer.xOffset, centerY - layer.yOffset);
      }}
    />
  ));
}
