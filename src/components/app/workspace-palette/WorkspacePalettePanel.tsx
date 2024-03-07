import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import WorkspacePalette from "@/components/app/workspace-palette/WorkspacePalette";
import CollapsibleHeader from "@/components/ui/collapsible/CollapsibleHeader";
import Panel from "@/components/ui/panel/Panel";
import { WorkspaceTaf } from "@/lib/state/gaf-studio/workspace-taf";
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
            setCurrentPalette={(pal) => workspace.setCurrentPalette(pal)}
          />
        </div>
      )}
    </Panel>
  );
}
