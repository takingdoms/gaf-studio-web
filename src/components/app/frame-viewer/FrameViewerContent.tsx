import FrameCanvasWrapper from '@/components/app/frame-canvas/FrameCanvasWrapper';
import MainFrameSelector from '@/components/app/frame-selector/MainFrameSelector';
import SubframeSelector from '@/components/app/frame-selector/SubframeSelector';
import FrameViewerSeparator from '@/components/app/frame-viewer/FrameViewerSeparator';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import React from 'react';

export default function FrameViewerContent() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const showSubframeSelector = workspace.getActiveFrame()?.frameData.kind === 'multi';

  return (<>
    <div className="flex flex-col">
      <MainFrameSelector />
    </div>

    <FrameViewerSeparator />

    {showSubframeSelector && (<>
      <div className="flex flex-col">
        <SubframeSelector />
      </div>
      <FrameViewerSeparator />
    </>)}

    <div className="grow flex flex-col">
      <FrameCanvasWrapper />
    </div>
  </>);
}
