import { CanvasTransforms } from "@/lib/state/canvas-transforms/canvas-transforms-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";

export default function MouseCanvas() {
  // console.log('Rendering MouseCanvas');

  const setPan = useSetAtom(CanvasTransforms.pan);
  const lastPanReset = useAtomValue(CanvasTransforms.lastPanReset);

  const inputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = inputRef.current;

    if (input === null) {
      return;
    }

    let start: [number, number] | undefined = undefined;
    let lastPan: [number, number] = [0, 0];
    let curPan: [number, number] = [0, 0];

    let animationFrame: number | undefined;

    const onChangePan = (pan: [number, number]) => {
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        setPan(pan);
      });
    };

    const onMouseDown = (ev: MouseEvent) => {
      ev.preventDefault();

      if (ev.button === 1) { // middle button
        start = [ev.clientX, ev.clientY];
      }
    };

    const onMouseMove = (ev: MouseEvent) => {
      if (start === undefined) {
        return;
      }

      const [startX, startY] = start;
      const [lastPanX, lastPanY] = lastPan;

      const panX = ev.clientX - startX;
      const panY = ev.clientY - startY;

      curPan = [lastPanX + panX, lastPanY + panY];
      onChangePan(curPan);
    };

    const onMouseUp = () => {
      start = undefined;
      lastPan = [...curPan];
    };

    input.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
    window.addEventListener('blur', onMouseUp);

    return () => {
      input.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('blur', onMouseUp);

      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [lastPanReset, setPan]);

  return (
    <div
      ref={inputRef}
      className="absolute inset-0"
    />
  );
}
