import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import WorkspacePalette from "@/components/app/workspace-palette/WorkspacePalette";
import CollapsibleHeader from "@/components/ui/collapsible/CollapsibleHeader";
import Panel from "@/components/ui/panel/Panel";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import React from 'react';

export default function WorkspacePalettePanel() {
  const [expanded, setExpanded] = React.useState(true);

  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null || workspace instanceof WorkspaceTaf) {
    return;
  }

  return (
    <Panel>
      <CollapsibleHeader
        expanded={expanded}
        setExpanded={setExpanded}
      >
        Workspace Palette
      </CollapsibleHeader>

      {expanded && (
        <div className="grow flex flex-col overflow-hidden bg-white">
          <WorkspacePalette
            currentPalette={workspace.state.currentPalette}
          />
        </div>
      )}
    </Panel>
  );
}
