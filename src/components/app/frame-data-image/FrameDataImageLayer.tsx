import { ActualImage } from "@/lib/image/image-resource";

type FrameDataImageLayerProps = {
  image: ActualImage;
  width: number;
  height: number;
  keepAspectRatio: boolean;
};

export default function FrameDataImageLayer({
  image,
  width,
  height,
  keepAspectRatio,
}: FrameDataImageLayerProps) {
  const style: React.CSSProperties = keepAspectRatio ? {
    imageRendering: 'pixelated',
  } : {
    imageRendering: 'pixelated',
    width: width,
    height: height,
    maxWidth: width,
    maxHeight: height,
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
      <img
        alt="Frame Data Image"
        src={image}
        width={width}
        height={height}
        style={style}
      />
    </div>
  );
}
