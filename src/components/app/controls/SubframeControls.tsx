import FrameDataControls from "@/components/app/controls/FrameDataControls";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from "react";

export default function SubframeControls() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return null;
  }

  const activeFrame = workspace.getActiveFrame();

  if (activeFrame === null || activeFrame.frameData.kind === 'single') {
    return null;
  }

  const activeSubframe = workspace.getActiveSubframe();

  if (activeSubframe === null) {
    return (
      <div className="grow text-center text-gray-400 bg-white p-2">
        (No subframe selected)
      </div>
    );
  }

  return (
    <div className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white px-4 py-2">
      <FrameDataControls
        frameData={activeSubframe}
        isSubframe={true}
        isGaf={workspace.state.format === 'gaf'}
        modify={(mod) => workspace.modifyActiveSubframe(mod)}
      />
    </div>
  );
}
