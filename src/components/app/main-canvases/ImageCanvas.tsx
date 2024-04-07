import AutoSizedCanvas from '@/components/app/main-canvases/AutoSizedCanvas';
import { CanvasHelperContext } from '@/lib/canvas/CanvasHelperContext';
import { Debug } from '@/lib/debug/debug';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type ImageCanvasProps = {
  frameData: VirtualFrameData;
};

export default function ImageCanvas({
  frameData,
}: ImageCanvasProps) {
  console.log('Rendering ImageCanvas');

  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  const layers = frameData.kind === 'multi'
    ? frameData.layers
    : [frameData];

  return layers.map((layer, index) => (
    <AutoSizedCanvas
      key={index}
      onRender={(canvas, panX, panY) => {
        const ctx = new CanvasHelperContext(canvas);

        let image: ImageData;

        if (layer.layerData.kind === 'raw-colors-pair') {
          image = activePairSubFormat === 'taf_1555'
            ? layer.layerData.imageResource1555.compiledImage
            : layer.layerData.imageResource4444.compiledImage;
        }
        else {
          image = layer.layerData.imageResource.compiledImage
        }

        Debug.assertEq(layer.width, image.width);
        Debug.assertEq(layer.height, image.height);

        const centerX = Math.floor(ctx.canvas.width / 2);
        const centerY = Math.floor(ctx.canvas.height / 2);

        ctx.drawImage(
          image,
          centerX - layer.xOffset + panX,
          centerY - layer.yOffset + panY,
        );
      }}
    />
  ));
}
