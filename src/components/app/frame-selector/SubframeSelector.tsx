import LayerSelector from "@/components/app/frame-selector/LayerSelector";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from "react";

export default function SubframeSelector() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return null;
  }

  const activeFrame = workspace.getActiveFrame();

  if (activeFrame === null) {
    return null;
  }

  const frameData = activeFrame.frameData;

  if (frameData.kind === 'single') {
    return null;
  }

  return (
    <LayerSelector
      layers={frameData.layers}
      selectedIndex={workspace.state.cursor.subframeIndex}
      setSelectedIndex={(index) => workspace.setActiveSubframeIndex(index)}
    />
  );
}
