import BetaEntry from '@/components/app/beta/BetaEntry';
import { S } from '@/lib/state/store/store-helper';

export default function BetaEntries() {
  console.log('Rendering BetaEntries');

  const entriesLength = S.useEntriesLength();

  return (
    <ul className="list-disc pl-4">
      {Array.from({ length: entriesLength }).map((_, entryIndex) => (
        <BetaEntry
          key={entryIndex}
          entryIndex={entryIndex}
        />
      ))}
    </ul>
  );
}
