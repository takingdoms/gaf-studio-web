import BetaFrame from '@/components/app/beta/BetaFrame';
import { useWorkspaceStore } from '@/lib/state/store/use-workspace-store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

type BetaEntryProps = {
  entryIndex: number;
};

export default function BetaEntry({ entryIndex }: BetaEntryProps) {
  console.log('Rendering BetaEntry ' + entryIndex);

  const entryName = useWorkspaceStore()((state) => state.entries[entryIndex].name);

  const frames = useWorkspaceStore()(
    useShallow((state) => Object.keys(state.entries[entryIndex].frames))
  );

  return (
    <div className="border border-dotted border-red-500 px-2 py-1 mb-1">
      #{entryIndex} - {entryName} - {frames.length} frames

      <ul className="list-disc pl-4">
        {frames.map((frameKey, index) => (
          <BetaFrame
            key={index}
            entryIndex={entryIndex}
            frameIndex={+frameKey}
          />
        ))}
      </ul>
    </div>
  );
}
