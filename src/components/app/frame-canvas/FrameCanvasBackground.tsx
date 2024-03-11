import { useCanvasConfigStore } from "@/lib/state/canvas/canvas-config-store";

export default function FrameCanvasBackground() {
  const background = useCanvasConfigStore((state) => state.background);

  return (
    <div
      className="absolute inset-0"
      style={{ background }}
    />
  );
}
