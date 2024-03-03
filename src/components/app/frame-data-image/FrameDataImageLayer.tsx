import { ActualImage } from "@/lib/image/image-resource";
import React from "react";

type FrameDataImageLayerProps = {
  image: ActualImage;
  width: number;
  height: number;
  keepAspectRatio: boolean;
  scaleX?: number;
  scaleY?: number;
};

export default function FrameDataImageLayer({
  image,
  width,
  height,
  keepAspectRatio,
  scaleX: _scaleX,
  scaleY: _scaleY,
}: FrameDataImageLayerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const scaleX = _scaleX ?? 1;
  const scaleY = _scaleY ?? 1;

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    ctx.putImageData(image, 0, 0);
  }, [image]);

  let scale: string | undefined = undefined;

  if (scaleX !== 1 || scaleY !== 1) {
    scale = `${scaleX} ${scaleY}`;
  }

  const style: React.CSSProperties = keepAspectRatio ? {
    imageRendering: 'pixelated',
    maxWidth: '100%',
    height: 'auto',
  } : {
    imageRendering: 'pixelated',
    width,
    height,
    maxWidth: width,
    maxHeight: height,
    scale,
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={style}
      />
    </div>
  );
}
