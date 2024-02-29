import FrameSelector from "@/components/app/frame-selector/FrameSelector";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from "react";

export default function MainFrameSelector() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return null;
  }

  const activeEntry = workspace.getActiveEntry();

  if (activeEntry === null) {
    return null;
  }

  return (
    <FrameSelector
      frames={activeEntry.frames}
      selectedIndex={workspace.state.cursor.frameIndex}
      setSelectedIndex={(index) => workspace.setActiveFrameIndex(index)}
    />
  );
}
