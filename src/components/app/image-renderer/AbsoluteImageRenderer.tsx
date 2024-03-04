import AbsoluteImageRendererContainer from '@/components/app/image-renderer/AbsoluteImageRendererContainer';
import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { ActualImage } from '@/lib/image/image-resource';

type AbsoluteImageRendererProps = {
  image: ActualImage;
  width: number;
  height: number;
  contain: boolean;
  smoothing: boolean;
  scaleX?: number;
  scaleY?: number;
};

export default function AbsoluteImageRenderer({
  image,
  width,
  height,
  contain,
  smoothing,
  scaleX,
  scaleY,
}: AbsoluteImageRendererProps) {
  return (
    <AbsoluteImageRendererContainer
      width={width * (scaleX ?? 1)}
      height={height * (scaleY ?? 1)}
      contain={contain}
    >
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
        <ImageRenderer
          image={image}
          width={width}
          height={height}
          contain={contain}
          smoothing={smoothing}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </div>
    </AbsoluteImageRendererContainer>
  );
}
