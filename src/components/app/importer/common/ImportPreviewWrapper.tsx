import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';

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

  return (
    <div
      className="relative"
      style={{
        // + 1 = to account for border width
        width: Math.min(wrapperWidth, imageWidth),
        height: Math.min(wrapperHeight, imageHeight),
      }}
    >
      <div
        className="absolute inset-0 flex justify-center items-center border border-slate-300
          overflow-hidden p-1"
      >
        {image}
      </div>
    </div>
  );
}
