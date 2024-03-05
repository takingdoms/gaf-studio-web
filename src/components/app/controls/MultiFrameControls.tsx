import ActiveFrameInput from '@/components/app/controls/ActiveFrameInput';
import FrameDataControls from '@/components/app/controls/FrameDataControls';
import NumberControl from '@/components/ui/control/NumberControl';
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
          <div className="flex items-center whitespace-nowrap">
            <NumberControl
              value={activeSubframeIndex !== null ? (activeSubframeIndex + 1) : null}
              setValue={(value) => setActiveSubframeIndex(value - 1)}
              min={1}
              max={frameData.layers.length}
            />
            <span className="font-mono">
              &nbsp;/&nbsp;
              {frameData.layers.length}
            </span>
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
