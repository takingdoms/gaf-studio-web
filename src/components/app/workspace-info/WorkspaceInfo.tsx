import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import React from 'react';

type WorkspaceInfoProps = {};

export default function WorkspaceInfo({}: WorkspaceInfoProps) {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  return (
    <div className="p-4">
      <div className="font-bold mb-1.5">Workspace Info</div>
      <div>Format: {workspace.format}</div>
      {/* <div className="bg-green-500" style={{ width: 20, height: 3000 }} /> */}
    </div>
  );
}
