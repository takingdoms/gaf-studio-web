import { NumberControlSideButton } from "@/components/ui/control/NumberControlSideButton";
import { Icons } from "@/lib/react/icons";
import { CanvasTransforms } from "@/lib/state/canvas-transforms/canvas-transforms-atoms";
import { useAtom, useSetAtom } from "jotai";

export default function CanvasControls() {
  const [[panX, panY], setPan] = useAtom(CanvasTransforms.pan);
  const setLastPanReset = useSetAtom(CanvasTransforms.lastPanReset);

  return (
    <div className="h-full flex items-center justify-center text-xs">
      <div className="flex items-center space-x-1 font-mono">
        <span
          className="font-bold"
          title="Middle-click and drag on the image to pan"
        >
          Pan:
        </span>
        <span>{panX}</span>,
        <span>{panY}</span>
        <NumberControlSideButton
          icon={<Icons.Reset size={12} />}
          onClick={() => {
            setPan([0, 0]);
            setLastPanReset((v) => v + 1);
          }}
        />
      </div>
    </div>
  );
}
