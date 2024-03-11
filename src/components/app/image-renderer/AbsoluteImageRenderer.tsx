import AbsoluteImageRendererContainer from '@/components/app/image-renderer/AbsoluteImageRendererContainer';
import AbsoluteImageRendererWrapper from '@/components/app/image-renderer/AbsoluteImageRendererWrapper';
import ImageRenderer from '@/components/app/image-renderer/ImageRenderer';
import { ActualImage } from '@/lib/image/image-resource';

type AbsoluteImageRendererProps = {
  image: ActualImage;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  displace: boolean; // whether the x and y offsets are to displace the image
  contain: boolean;
  smoothing: boolean;
  scaleX?: number;
  scaleY?: number;
};

export default function AbsoluteImageRenderer({
  image,
  width,
  height,
  xOffset,
  yOffset,
  displace,
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
      <AbsoluteImageRendererWrapper
        xOffset={displace ? xOffset : 0}
        yOffset={displace ? yOffset : 0}
      >
        <ImageRenderer
          image={image}
          width={width}
          height={height}
          contain={contain}
          smoothing={smoothing}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </AbsoluteImageRendererWrapper>
    </AbsoluteImageRendererContainer>
  );
}
