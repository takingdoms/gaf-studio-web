import { WorkspaceControllerContext } from "@/components/app/logical/WorkspaceControllerContext";
import WorkspaceInfoGaf from "@/components/app/workspace-info/WorkspaceInfoGaf";
import WorkspaceInfoTaf from "@/components/app/workspace-info/WorkspaceInfoTaf";
import Panel from "@/components/ui/panel/Panel";
import { Icons } from "@/lib/react/icons";
import React from 'react';

export default function WorkspaceInfoPanel() {
  const [expanded, setExpanded] = React.useState(true);

  const workspaceController = React.useContext(WorkspaceControllerContext);

  if (workspaceController === null) {
    return;
  }

  const workspace = workspaceController.state;

  return (
    // <div className="h-full flex flex-col">
      <Panel>
        <button
          className="flex items-center border border-gray-300 p-2
            bg-gradient-to-br from-slate-50 to-slate-200 text-slate-600
            hover:border-slate-400 hover:text-slate-700 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="grow font-bold truncate text-sm">
            {/* Workspace Information */}
            {/* {workspace.format === 'gaf' ? 'GAF' : 'TAF'} Information */}
            Information
          </div>

          {expanded
            ? <Icons.CaretDown />
            : <Icons.CaretUp />}
        </button>

        {expanded && (
          <div className="grow flex flex-col overflow-hidden bg-white">
            {/* <div style={{ width: 32, height: 3000, background: 'red' }} /> */}
            <div className="p-2 overflow-auto">
              {workspace.format === 'gaf'
                ? <WorkspaceInfoGaf workspaceGaf={workspace} />
                : <WorkspaceInfoTaf workspaceTaf={workspace} />}
            </div>
          </div>
        )}
      </Panel>
    // </div>
  );
}
