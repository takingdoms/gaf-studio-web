import FrameSelectorImageRenderer from '@/components/app/image-renderer/FrameSelectorImageRenderer';
import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';
import { Icons } from '@/lib/react/icons';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import { IconCaretDown } from '@tabler/icons-react';

type FrameSelectorItemProps = {
  index: number;
  frameData: VirtualFrameData;
  isSelected: boolean;
  onClick: () => void;
};

// TODO put some constant/config somewhere that tells whether the first subframe to be selected
// by default on frame change is null or the first subframe available. If it's null then the
// value below show be set to true otherwise to false
const COMPOSITE_MULTI_LAYERS: boolean = false;

export default function FrameSelectorItem({
  index,
  frameData,
  isSelected,
  onClick,
}: FrameSelectorItemProps) {
  // console.log('Rendering FrameSelectorItem');

  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-gray-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

  let image: React.ReactNode;

  if (frameData.kind === 'single') {
    image = <FrameSelectorImageRenderer frameData={frameData} />;
  }
  else {
    if (COMPOSITE_MULTI_LAYERS || frameData.layers.length === 0) {
      image = <FrameSelectorImageRenderer frameData={frameData} />;
    }
    else {
      const firstLayer = frameData.layers[0];

      image = <FrameSelectorImageRenderer frameData={firstLayer} />;
    }
  }

  return (
    <div
      className={`shrink-0 bg-white border-2 ${borderCls} ${cursorCls}`}
      style={{
        width: FRAME_SELECTOR_ITEM_WIDTH,
        height: FRAME_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={isSelected ? undefined : onClick}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className={`${textCls} font-bold font-mono text-xs text-center px-1 py-0.5`}>
          <span>#{index + 1}</span>
        </div>
        <div className="basis-0 grow overflow-hidden flex justify-center items-center">
          {image}
        </div>
        <div className={`${textCls} font-bold font-mono text-xs px-1 py-0.5 truncate`}>
          {frameData.kind === 'multi' ? (
            <div
              className="flex justify-center items-center space-x-1"
              title="Multi-layered"
            >
              <Icons.MultiLayered size={14} /> (x{frameData.layers.length})
            </div>
          ) : (
            <div
              className="flex justify-center items-center space-x-1 invisible"
              title="Single-layered"
            >
              <Icons.SingleLayered size={14} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
