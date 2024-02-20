import { WorkspaceControllerContext } from "@/components/app/logical/WorkspaceControllerContext";
import React from 'react';

export default function WorkspaceInfo() {
  const workspaceController = React.useContext(WorkspaceControllerContext);

  if (workspaceController === null) {
    return;
  }

  const workspace = workspaceController.state;

  return (
    <div className="p-4">
      <div className="font-bold mb-1.5">Workspace Info</div>
      <div>Format: {workspace.format}</div>
      {/* <div className="bg-green-500" style={{ width: 20, height: 3000 }} /> */}
    </div>
  );
}
