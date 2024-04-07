import { CanvasTransforms } from '@/lib/state/canvas-transforms/canvas-transforms-atoms';
import { useAtomValue } from 'jotai';
import React from 'react';

type AutoSizedCanvasProps = {
  onRender: (canvas: HTMLCanvasElement, panX: number, panY: number) => void;
};

export default function AutoSizedCanvas({ onRender }: AutoSizedCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pan = useAtomValue(CanvasTransforms.pan);
  // const panRef = React.useRef([0, 0]);

  const doRender = React.useCallback(() => {
    if (canvasRef.current !== null) {
      // const [panX, panY] = panRef.current;
      const [panX, panY] = pan;
      onRender(canvasRef.current, panX, panY);
    }
  }, [onRender, pan]);

  /*CanvasTransforms.usePanListener(React.useCallback((get, set, newVal, prevVal) => {
    panRef.current = newVal;
    doRender();
  }, [doRender]));*/

  const onResized = React.useCallback((canvas: HTMLCanvasElement) => {
    // \/ maybe replace with canvas.offsetWidth and canvas.offsetHeight
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    doRender();
  }, [doRender]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    onResized(canvas);

    let firstRender = true;

    const resizeObserver = new ResizeObserver(() => {
      if (firstRender) {
        firstRender = false;
        return;
      }

      onResized(canvas);
    });

    resizeObserver.observe(canvas, { box: 'device-pixel-content-box' });

    return () => {
      resizeObserver.disconnect();
    };
  }, [onResized]);

  const content = React.useMemo(() => (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  ), []);

  return content;
}
