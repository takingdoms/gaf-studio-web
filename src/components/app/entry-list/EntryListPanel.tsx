import EntryListTable from '@/components/app/entry-list/EntryListTable';
import Panel from '@/components/ui/panel/Panel';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function EntryListPanel() {
  // console.log('Rendering EntryListPanel');

  const entriesLength = S.useEntriesLength();

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white">
        <div className="text-center text-sm font-bold text-slate-600 py-1">
          Sequences ({entriesLength})
        </div>
        <div className="grow overflow-auto">
          <div className="relative">
            <EntryListTable />
          </div>
        </div>
      </div>
    </Panel>
  );
}
