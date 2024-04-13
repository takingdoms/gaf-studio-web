import TextButton from "@/components/ui/button/TextButton";
import { AdHocWizardsContext } from "@/lib/react/ad-hoc-wizards-context";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function ExportCurrentSubframes() {
  const activeFrameIndex = S.useActiveFrameIndex();
  const activeFrameSubframesCount = S.useActiveFrameSubframesCount();

  const { exportFrameImages } = React.useContext(AdHocWizardsContext);

  if (activeFrameIndex === null) {
    return;
  }

  return (
    <div className="text-xs">
      <TextButton
        label="Export all"
        onClick={() => exportFrameImages(activeFrameIndex)}
        disabled={activeFrameSubframesCount === undefined || activeFrameSubframesCount === 0}
      />
    </div>
  );
}
