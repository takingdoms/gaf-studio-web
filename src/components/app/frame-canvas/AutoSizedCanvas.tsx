import React from 'react';

type AutoSizedCanvasProps = {
  onRender: (canvas: HTMLCanvasElement) => void;
};

export default function AutoSizedCanvas({ onRender }: AutoSizedCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const onResize = React.useCallback((canvas: HTMLCanvasElement) => {
    // \/ maybe replace with canvas.offsetWidth and canvas.offsetHeight
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    onRender(canvas);
  }, [onRender]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    onResize(canvas);

    let firstRender = true;

    const resizeObserver = new ResizeObserver(() => {
      if (firstRender) {
        firstRender = false;
        return;
      }

      onResize(canvas);
    });

    resizeObserver.observe(canvas, { box: 'device-pixel-content-box' });

    return () => {
      resizeObserver.disconnect();
    };
  }, [onResize]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        imageRendering: 'pixelated',
      }}
    />
  );
}
