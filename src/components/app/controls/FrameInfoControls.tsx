import { NumberControlSideButton } from "@/components/ui/control/NumberControlSideButton";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { Icons } from "@/lib/react/icons";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function FrameInfoControls() {
  const activeFrameDuration = S.useActiveFrameDuration();
  const { changeFrameDuration } = React.useContext(AdHocWizardsContext);

  if (activeFrameDuration === null) {
    throw new Error(`Can't use this component when there's no active frame.`);
  }

  return (
    <div className="flex justify-center items-center mx-2">
      <div className="self-center flex items-baseline mr-1.5">
        <div>Frame duration:</div>
        <div className="grow font-mono">
          &nbsp;{activeFrameDuration}
        </div>
      </div>

      <NumberControlSideButton
        icon={<Icons.Edit size={14} />}
        onClick={() => changeFrameDuration(false)}
      />
    </div>
  );
}
