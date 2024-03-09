import { useWorkspaceStore } from '@/lib/state/store/use-workspace-store';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

type BetaFrameProps = {
  entryIndex: number;
  frameIndex: number;
};

export default function BetaFrame({ entryIndex, frameIndex }: BetaFrameProps) {
  console.log('Rendering BetaFrame ' + entryIndex + ' ' + frameIndex);

  const frame = useWorkspaceStore()((state) => state.entries[entryIndex].frames[frameIndex]);
  const setFrame = useWorkspaceStore()((state) => state.setFrame);

  return (
    <div className="border border-dotted border-blue-500 px-2 py-1 mb-1">
      <div className="mb-0.5">
        #{frameIndex} -
        X: {frame.xOffset}
        <span className="mx-1.5 text-gray-300">|</span>
        Y: {frame.yOffset}
      </div>
      <div className="flex space-x-2">
        <button
          className="border border-slate-400 rounded px-1 py-0.5"
          onClick={() => {
            setFrame(entryIndex, frameIndex, {
              ...frame,
              xOffset: frame.xOffset + 1,
            });
          }}
        >
          Inc X
        </button>

        <button
          className="border border-slate-400 rounded px-1 py-0.5"
          onClick={() => {
            setFrame(entryIndex, frameIndex, {
              ...frame,
              yOffset: frame.yOffset + 1,
            });
          }}
        >
          Inc Y
        </button>
      </div>
    </div>
  );
}
