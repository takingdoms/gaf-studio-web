import FrameCanvasWrapperMultiComposite from '@/components/app/frame-canvas/FrameCanvasWrapperMultiComposite';
import FrameCanvasWrapperSingle from '@/components/app/frame-canvas/FrameCanvasWrapperSingle';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import React from 'react';

export default function FrameCanvasWrapper() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return null;
  }

  const activeFrame = workspace.getActiveFrame();

  if (activeFrame === null) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        No frame selected
      </div>
    );
  }

  const frameData = activeFrame.frameData;

  if (frameData.kind === 'single') {
    return (
      <FrameCanvasWrapperSingle
        frameData={frameData}
      />
    );
  }

  const activeSubframeIndex = workspace.state.cursor.subframeIndex;

  if (activeSubframeIndex === null) {
    return (
      <FrameCanvasWrapperMultiComposite
        frameData={frameData}
      />
    );
  }

  const subframeData = frameData.layers[activeSubframeIndex];

  return (
    <FrameCanvasWrapperSingle
      frameData={subframeData}
    />
  );
}
