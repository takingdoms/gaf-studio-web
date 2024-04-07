import { CanvasTransforms } from "@/lib/state/canvas-transforms/canvas-transforms-atoms";
import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";
import { useAtomValue } from "jotai";

export default function FrameContentBackground() {
  // console.log('Rendering FrameContentBackground');

  const background = useCanvasConfigStore((state) => state.background);
  const [panX, panY] = useAtomValue(CanvasTransforms.pan);

  return (
    <div
      className="absolute inset-0"
      style={{
        background,
        backgroundPositionX: panX,
        backgroundPositionY: panY,
      }}
    />
  );
}
