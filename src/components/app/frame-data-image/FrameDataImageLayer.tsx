import { ActualImage } from "@/lib/image/image-resource";
import React from "react";

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
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(image, 0, 0);
  }, [image]);

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
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={style}
      />
    </div>
  );
}
