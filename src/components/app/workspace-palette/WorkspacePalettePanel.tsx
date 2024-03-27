import WorkspacePalette from "@/components/app/workspace-palette/WorkspacePalette";
import CollapsibleHeader from "@/components/ui/collapsible/CollapsibleHeader";
import Panel from "@/components/ui/panel/Panel";
import React from 'react';

export default function WorkspacePalettePanel() {
  // console.log('Rendering WorkspacePalettePanel');

  const [expanded, setExpanded] = React.useState(true);

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
          <WorkspacePalette />
        </div>
      )}
    </Panel>
  );
}
