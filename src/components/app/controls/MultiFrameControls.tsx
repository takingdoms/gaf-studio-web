import ActiveFrameInput from '@/components/app/controls/ActiveFrameInput';
import FrameDataControls from '@/components/app/controls/FrameDataControls';
import { VirtualGafFrameDataMultiLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { DeepReadonly } from 'ts-essentials';

type MultiFrameControlsProps = DeepReadonly<{
  frameData: VirtualGafFrameDataMultiLayer;
  activeSubframeIndex: number | null;
  setActiveSubframeIndex: (index: number | null) => void;
  isGaf: boolean;
  modify: (mod: Pick<VirtualGafFrameDataMultiLayer, 'xOffset' | 'yOffset'>) => void;
}>;

export default function MultiFrameControls({
  frameData,
  activeSubframeIndex,
  setActiveSubframeIndex,
  isGaf,
  modify,
}: MultiFrameControlsProps) {
  const hasSubFrames = frameData.layers.length > 0;

  return (
    <div className="flex flex-col">
      <FrameDataControls
        frameData={frameData}
        isSubframe={false}
        isGaf={isGaf}
        modify={modify}
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
