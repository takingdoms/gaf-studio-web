import { NumberControlSideButton } from "@/components/ui/control/NumberControlSideButton";
import { ModalHelpersContext } from "@/components/ui/modal/ModalContext";
import { Icons } from "@/lib/react/icons";
import { CanvasTransforms } from "@/lib/state/canvas-transforms/canvas-transforms-atoms";
import { useAtom, useSetAtom } from "jotai";
import React from "react";

export default function CanvasControls() {
  const [[panX, panY], setPan] = useAtom(CanvasTransforms.pan);
  const setLastPanReset = useSetAtom(CanvasTransforms.lastPanReset);

  const { numberPrompt } = React.useContext(ModalHelpersContext);

  const onClickEditPanX = async () => {
    const newPanX = await numberPrompt({
      title: 'Set camera X',
      label: 'Value',
      defaultValue: panX,
    });

    if (newPanX !== null) {
      setPan([newPanX, panY]);
      setLastPanReset((v) => v + 1);
    }
  };

  const onClickEditPanY = async () => {
    const newPanY = await numberPrompt({
      title: 'Set camera Y',
      label: 'Value',
      defaultValue: panY,
    });

    if (newPanY !== null) {
      setPan([panX, newPanY]);
      setLastPanReset((v) => v + 1);
    }
  };

  return (
    <div className="h-full flex items-center justify-center text-xs">
      <div className="flex items-center space-x-1 font-mono">
        <span
          className="font-bold"
          title="Middle-click and drag on the image to move camera"
        >
          Camera:
        </span>
        <span
          className="cursor-pointer"
          onClick={onClickEditPanX}
        >
          {panX}
        </span>,
        <span
          className="cursor-pointer"
          onClick={onClickEditPanY}
        >
          {panY}
        </span>
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
