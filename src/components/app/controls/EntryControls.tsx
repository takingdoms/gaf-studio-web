import ActiveFrameInput from '@/components/app/controls/ActiveFrameInput';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import { FormatUtils } from '@/lib/utils/format-utils';
import React from 'react';

export default function EntryControls() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const activeEntry = workspace.getActiveEntry();

  if (activeEntry === null) {
    return (
      <div className="text-center text-gray-400 bg-white p-2">
        (No entry selected)
      </div>
    );
  }

  const hasFrames = activeEntry.frames.length > 0;

  return (
    <div className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white space-y-2 px-4 py-2">
      <div className="flex flex-col text-center">
        <div className="font-bold text-gray-700">Entry selected:</div>
        <div className="whitespace-nowrap overflow-auto font-mono">
          {activeEntry.name}
        </div>
      </div>

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      {/* TODO make this a table */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-baseline">
          <div>Unknown1:</div>
          <div className="grow font-mono">
            &nbsp;{activeEntry.unknown1} ({FormatUtils.hex(activeEntry.unknown1)})
          </div>
        </div>
        <div className="flex items-baseline">
          <div>Unknown2:</div>
          <div className="grow font-mono">
            &nbsp;{activeEntry.unknown2} ({FormatUtils.hex(activeEntry.unknown2)})
          </div>
        </div>
      </div>

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      {hasFrames && (
        <div className="flex items-center space-x-2 border-dashed border-gray-300 rounded-sm">
          <div className="truncate">
            Selected frame:
          </div>
          <div className="whitespace-nowrap">
            <ActiveFrameInput
              activeFrameIndex={workspace.state.activeFrameIndex}
              setActiveFrameIndex={(index) => workspace.setActiveFrameIndex(index)}
              minFrameIndex={0}
              maxFrameIndex={activeEntry.frames.length - 1}
            /> / {activeEntry.frames.length}
          </div>
        </div>
      )}
    </div>
  );
}
