import { ActualImage } from '@/lib/image/image-resource';
import React from 'react';

type ImageRendererProps = {
  image: ActualImage;
  width: number;
  height: number;
  contain: boolean;
  smoothing: boolean;
  scaleX?: number;
  scaleY?: number;
  style?: {
    background?: string;
    border?: string;
  };
};

export default function ImageRenderer({
  image,
  width,
  height,
  contain,
  smoothing,
  scaleX: _scaleX,
  scaleY: _scaleY,
  style,
}: ImageRendererProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const scaleX = _scaleX ?? 1;
  const scaleY = _scaleY ?? 1;

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = smoothing;

    // TODO make this rendering COMPLETELY lossless
    // maybe the true solution would be to convert to a png image using something like pngjs
    // then render like a normal HTMLImageElement
    ctx.putImageData(image, 0, 0);
  }, [image, smoothing]);

  let scale: string | undefined = undefined;

  if (scaleX !== 1 || scaleY !== 1) {
    scale = `${scaleX} ${scaleY}`;
  }

  // probably useless for canvas rendering (used to be useful when this was an HTMLImageElement)
  // still here to easily see whether smoothing is enabled on the canvas with inspect-element
  const imageRendering = smoothing ? 'auto' : 'pixelated';

  const baseStyle: React.CSSProperties = {
    imageRendering,
  };

  const finalStyle: React.CSSProperties = contain ? {
    ...style,
    ...baseStyle,
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  } : {
    ...style,
    ...baseStyle,
    width,
    height,
    maxWidth: width,
    maxHeight: height,
    scale,
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={finalStyle}
    />
  );
}
