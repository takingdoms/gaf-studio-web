import OptionButton from "@/components/app/frame-canvas/frame-canvas-options/OptionButton";
import { Icons } from "@/lib/react/icons";

export default function FrameCanvasOptionsDiv() {
  return (
    <div className="flex space-x-2">
      <OptionButton
        icon={Icons.Options}
        label="Options"
        onClick={() => {}}
      />
    </div>
  );
}
