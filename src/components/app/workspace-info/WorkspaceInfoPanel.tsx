import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import WorkspaceInfoGaf from "@/components/app/workspace-info/WorkspaceInfoGaf";
import WorkspaceInfoTaf from "@/components/app/workspace-info/WorkspaceInfoTaf";
import CollapsibleHeader from "@/components/ui/collapsible/CollapsibleHeader";
import Panel from "@/components/ui/panel/Panel";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import React from 'react';

export default function WorkspaceInfoPanel() {
  const [expanded, setExpanded] = React.useState(true);

  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  return (
    // <div className="h-full flex flex-col">
      <Panel>
        <CollapsibleHeader
          expanded={expanded}
          setExpanded={setExpanded}
        >
          Workspace Configuration
        </CollapsibleHeader>

        {expanded && (
          <div className="grow flex flex-col overflow-hidden bg-white">
            {/* <div style={{ width: 32, height: 3000, background: 'red' }} /> */}
            <div className="p-2 overflow-auto">
              {workspace instanceof WorkspaceGaf
                ? <WorkspaceInfoGaf workspace={workspace} />
                : <WorkspaceInfoTaf workspace={workspace} />}
            </div>
          </div>
        )}
      </Panel>
    // </div>
  );
}
