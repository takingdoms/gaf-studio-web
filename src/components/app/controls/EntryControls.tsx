import ActiveFrameInput from '@/components/app/controls/ActiveFrameInput';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import NumberControl from '@/components/ui/control/NumberControl';
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
        (No sequence selected)
      </div>
    );
  }

  const hasFrames = activeEntry.frames.length > 0;

  const currentFrameIndex = workspace.state.cursor.frameIndex;

  return (
    <div
      className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white space-y-2 px-4 py-2"
    >
      <div className="flex flex-col text-center">
        <div className="font-bold text-gray-700">Sequence selected:</div>
        <div className="whitespace-nowrap overflow-auto font-mono">
          {activeEntry.name}
        </div>
      </div>

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      {/* TODO make this a table (reuse the same table from FrameDataControls) */}
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
          <div className="flex items-center whitespace-nowrap">
            <NumberControl
              value={currentFrameIndex !== null ? (currentFrameIndex + 1) : null}
              setValue={(value) => workspace.setActiveFrameIndex(value - 1)}
              min={1}
              max={activeEntry.frames.length}
            />
            <span className="font-mono">
              &nbsp;/&nbsp;
              {activeEntry.frames.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
