import EntryListPanel from '@/components/app/entry-list/EntryListPanel';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import WorkspaceFormatPanel from '@/components/app/workspace-format/WorkspaceFormatPanel';
import WorkspacePalettePanel from '@/components/app/workspace-palette/WorkspacePalettePanel';
import PairSeparator from '@/components/ui/misc/PairSeparator';
import { WorkspaceGaf } from '@/lib/gaf-studio/state/workspace-gaf';
import React from 'react';

export default function WorkspaceAndEntriesPanel() {
  const isGaf = React.useContext(WorkspaceContext) instanceof WorkspaceGaf;

  return (
    <div className="grow flex flex-col overflow-hidden">
      <div className="flex flex-col">
        <WorkspaceFormatPanel />
      </div>
      {isGaf && (<>
        <PairSeparator dir="V" />
        <div className="flex flex-col">
          <WorkspacePalettePanel />
        </div>
      </>)}
      <PairSeparator dir="V" />
      <div className="grow flex flex-col overflow-hidden">
        <EntryListPanel />
      </div>
    </div>
  );
}
