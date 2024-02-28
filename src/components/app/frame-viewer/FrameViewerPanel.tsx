import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import Panel from '@/components/ui/panel/Panel';
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
      <div className="grow flex flex-col justify-center items-center overflow-hidden bg-white">
        <div><b>Active Entry:</b></div>
        <div>{activeEntry.name}</div>
      </div>
    </Panel>
  );
}
