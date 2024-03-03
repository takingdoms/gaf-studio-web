import { ActualImage } from "@/lib/image/image-resource";

type FrameDataImageLayerProps = {
  image: ActualImage;
  width: number;
  height: number;
};

export default function FrameDataImageLayer({ image, width, height }: FrameDataImageLayerProps) {
  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
      <img
        alt="Frame Data Image"
        src={image}
        width={width}
        height={height}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
