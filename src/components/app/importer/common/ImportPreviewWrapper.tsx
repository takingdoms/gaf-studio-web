import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';

type ImportPreviewWrapperProps = {
  imageData: ImageData;
  imageWidth: number;
  imageHeight: number;
  wrapperWidth?: number;
  wrapperHeight?: number;
};

export default function ImportPreviewWrapper({
  imageData,
  imageWidth,
  imageHeight,
  wrapperWidth,
  wrapperHeight,
}: ImportPreviewWrapperProps) {
  wrapperWidth ??= 250;
  wrapperHeight ??= 300;

  const image = (
    <ImageRenderer
      image={imageData}
      width={imageWidth}
      height={imageHeight}
      contain={true}
      smoothing={false}
    />
  );

  const background = useCanvasConfigStore((state) => state.importBackground);

  return (
    <div
      className="relative"
      style={{
        width: Math.min(wrapperWidth, imageWidth),
        height: Math.min(wrapperHeight, imageHeight),
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="border border-gray-300">
          <div style={{
            background,
            width: imageWidth,
            height: imageHeight,
            maxWidth: '100%',
            maxHeight: '100%',
          }}>
            {image}
          </div>
        </div>
      </div>
    </div>
  );
}
