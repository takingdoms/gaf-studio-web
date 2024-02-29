import ActiveFrameInput from '@/components/app/controls/ActiveFrameInput';
import FrameDataControls from '@/components/app/controls/FrameDataControls';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type MultiFrameControlsProps = DeepReadonly<{
  frameData: LibGaf.GafFrameDataMultiLayer;
  activeSubframeIndex: number | null;
  setActiveSubframeIndex: (index: number | null) => void;
}>;

export default function MultiFrameControls({
  frameData,
  activeSubframeIndex,
  setActiveSubframeIndex,
}: MultiFrameControlsProps) {
  const hasSubFrames = frameData.layers.length > 0;

  return (
    <div className="flex flex-col">
      <FrameDataControls
        frameData={frameData}
        isSubframe={false}
      />

      <div className="mt-2 flex items-center space-x-2 border-dashed border-gray-300 rounded-sm">
        <div className="truncate">
          Selected subframe:
        </div>
        {hasSubFrames ? (
          <div className="whitespace-nowrap">
            <ActiveFrameInput
              activeFrameIndex={activeSubframeIndex}
              setActiveFrameIndex={setActiveSubframeIndex}
              minFrameIndex={0}
              maxFrameIndex={frameData.layers.length - 1}
            /> / {frameData.layers.length}
          </div>
        ) : (
          <div className="whitespace-nowrap text-gray-400">
            No subframes
          </div>
        )}
      </div>
    </div>
  );
}
