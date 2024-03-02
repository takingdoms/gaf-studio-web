import { ActualImage } from '@/lib/gaf-studio/image-resource/image-resource';

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
      />
    </div>
  );
}
