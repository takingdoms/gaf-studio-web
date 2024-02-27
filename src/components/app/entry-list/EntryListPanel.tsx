import EntryListTable from '@/components/app/entry-list/EntryListTable';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import Panel from '@/components/ui/panel/Panel';
import React from 'react';

export default function EntryListPanel() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const entries = workspace.getEntries();

  if (entries === null) {
    return;
  }

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white">
        <div className="text-center text-sm font-bold text-slate-600 py-1">Entries</div>
        <div className="grow overflow-auto">
          <div className="relative">
            <EntryListTable
              entries={entries}
              activeEntryIndex={workspace.state.activeEntryIndex}
              setActiveEntryIndex={(index) => workspace.setActiveEntryIndex(index)}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
