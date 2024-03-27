import EntryListPanel from '@/components/app/entry-list/EntryListPanel';
import WorkspaceFormatPanel from '@/components/app/workspace-format/WorkspaceFormatPanel';
import WorkspacePalettePanel from '@/components/app/workspace-palette/WorkspacePalettePanel';
import PairSeparator from '@/components/ui/misc/PairSeparator';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function WorkspaceAndEntriesPanel() {
  const isGaf = S.useFormat() === 'gaf';

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
