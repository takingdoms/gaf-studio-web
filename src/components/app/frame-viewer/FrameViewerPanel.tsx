import FrameSelector from '@/components/app/frame-selector/FrameSelector';
import LayerViewer from '@/components/app/layer-viewer/LayerViewer';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import Panel from '@/components/ui/panel/Panel';
import { SEPARATOR_WIDTH } from '@/lib/constants';
import React from 'react';

export default function FrameViewerPanel() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const activeEntry = workspace.getActiveEntry();

  if (activeEntry === null) {
    return;
  }

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white~">
        <FrameSelector
          frames={activeEntry.frames}
          selectedIndex={workspace.state.cursor.frameIndex}
          setSelectedIndex={(index) => workspace.setActiveFrameIndex(index)}
        />

        <div style={{ height: SEPARATOR_WIDTH, width: SEPARATOR_WIDTH }} />

        <LayerViewer todo="TODO" />
      </div>
    </Panel>
  );
}
