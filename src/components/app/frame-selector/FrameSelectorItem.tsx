import FrameDataCompositeImage from '@/components/app/frame-data-image/FrameDataCompositeImage';
import FrameDataImage from '@/components/app/frame-data-image/FrameDataImage';
import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';
import { VirtualGafFrameData } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';

type FrameSelectorItemProps = {
  index: number;
  frameData: VirtualGafFrameData;
  isSelected: boolean;
  onClick: () => void;
};

export default function FrameSelectorItem({
  index,
  frameData,
  isSelected,
  onClick,
}: FrameSelectorItemProps) {
  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-gray-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

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
          {frameData.kind === 'single' ? (
            <FrameDataImage
              frameData={frameData}
            />
          ) : (
            <FrameDataCompositeImage
              frameData={frameData}
            />
          )}
        </div>
        <div className={`${textCls} font-bold font-mono text-xs text-center px-1 py-0.5 truncate`}>
          {frameData.kind === 'multi' ? (
            <span>x{frameData.layers.length}</span>
          ) : (
            <span className="invisible">(No subframes)</span>
          )}
        </div>
      </div>
    </div>
  );
}
