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

    if (scaleX === 1 && scaleY === 1) {
      ctx.putImageData(image, 0, 0);
      return;
    }

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.imageSmoothingEnabled = false;

    tempCanvas.width = image.width;
    tempCanvas.height = image.height;

    tempCtx.putImageData(image, 0, 0);

    ctx.drawImage(
      tempCanvas,
      0, 0, tempCanvas.width, tempCanvas.height,
      0, 0, ctx.canvas.width, ctx.canvas.height,
    );
  }, [image, scaleX, scaleY]);

  const style: React.CSSProperties = keepAspectRatio ? {
    imageRendering: 'pixelated',
  } : {
    imageRendering: 'pixelated',
    width: width * scaleX,
    height: height * scaleY,
    maxWidth: width * scaleX,
    maxHeight: height * scaleY,
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width * scaleX}
        height={height * scaleY}
        style={style}
      />
    </div>
  );
}
