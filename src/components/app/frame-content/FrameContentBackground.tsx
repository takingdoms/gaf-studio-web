import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

export default function FrameContentBackground() {
  // console.log('Rendering FrameContentBackground');

  const background = useCanvasConfigStore((state) => state.background);

  return (
    <div
      className="absolute inset-0"
      style={{ background }}
    />
  );
}
