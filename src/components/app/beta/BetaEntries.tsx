import BetaEntry from '@/components/app/beta/BetaEntry';
import { useWorkspaceStore } from '@/lib/state/store/use-workspace-store';
import { useShallow } from 'zustand/react/shallow';

export default function BetaEntries() {
  console.log('Rendering BetaEntries');

  const entries = useWorkspaceStore()(useShallow((state) => Object.keys(state.entries)));

  return (
    <ul className="list-disc pl-4">
      {entries.map((entryKey, index) => (
        <BetaEntry
          key={index}
          entryIndex={+entryKey}
        />
      ))}
    </ul>
  );
}
