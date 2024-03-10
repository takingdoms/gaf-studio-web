import NumberControl from '@/components/ui/control/NumberControl';
import { S } from '@/lib/state/store/store-helper';
import { FormatUtils } from '@/lib/utils/format-utils';

export default function EntryControls() {
  // console.log('Rendering EntryControls');

  const activeEntryProps = S.useActiveEntryProps();
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const setActiveFrameIndex = S.useStore()((state) => state.setActiveFrameIndex);

  if (activeEntryProps === null) {
    return (
      <div className="text-center text-gray-400 bg-white p-2">
        (No sequence selected)
      </div>
    );
  }

  const hasFrames = activeEntryProps.framesLength > 0;

  return (
    <div
      className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white space-y-2 px-4 py-2"
    >
      <div className="flex flex-col text-center">
        <div className="font-bold text-gray-700">Sequence selected:</div>
        <div className="whitespace-nowrap overflow-auto font-mono">
          {activeEntryProps.name}
        </div>
      </div>

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      {/* TODO make this a table (reuse the same table from FrameDataControls) */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-baseline">
          <div>Unknown1:</div>
          <div className="grow font-mono">
            &nbsp;{activeEntryProps.unknown1} ({FormatUtils.hex(activeEntryProps.unknown1)})
          </div>
        </div>
        <div className="flex items-baseline">
          <div>Unknown2:</div>
          <div className="grow font-mono">
            &nbsp;{activeEntryProps.unknown2} ({FormatUtils.hex(activeEntryProps.unknown2)})
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
              value={activeFrameIndex !== null ? (activeFrameIndex + 1) : null}
              setValue={(value) => setActiveFrameIndex(value - 1)}
              min={1}
              max={activeEntryProps.framesLength}
            />
            <span className="font-mono">
              &nbsp;/&nbsp;
              {activeEntryProps.framesLength}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
