import FrameDataControls from "@/components/app/controls/FrameDataControls";
import MultiFrameControls from "@/components/app/controls/MultiFrameControls";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from "react";

export default function FrameControls() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const activeFrame = workspace.getActiveFrame();

  if (activeFrame === null) {
    return (
      <div className="grow text-center text-gray-400 bg-white p-2">
        (No frame selected)
      </div>
    );
  }

  return (
    <div className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white space-y-2 px-4 py-2">
      <div className="flex flex-col mx-2 space-y-1">
        <div className="self-center flex items-baseline">
          <div>Frame duration:</div>
          <div className="grow font-mono">
            &nbsp;{activeFrame.duration}
          </div>
        </div>
      </div>

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      {activeFrame.frameData.kind === 'single' ? (
        <FrameDataControls frameData={activeFrame.frameData} />
      ) : (
        <MultiFrameControls
          frameData={activeFrame.frameData}
          activeSubframeIndex={workspace.state.cursor.subframeIndex}
          setActiveSubframeIndex={(index) => workspace.setActiveSubframeIndex(index)}
        />
      )}
    </div>
  );
}
