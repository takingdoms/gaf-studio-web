import TextButton from "@/components/ui/button/TextButton";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function ExportCurrentFrames() {
  const activeEntryIndex = S.useActiveEntryIndex();
  const activeEntryFramesCount = S.useActiveEntryFramesCount();

  const { exportFrameImages } = React.useContext(AdHocWizardsContext);

  if (activeEntryIndex === null) {
    return;
  }

  return (
    <div className="text-xs">
      <TextButton
        label="Export all"
        onClick={() => exportFrameImages(activeEntryIndex)}
        disabled={activeEntryFramesCount === 0}
      />
    </div>
  );
}
