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
  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-gray-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

  let image: React.ReactNode;

  if (frameData.kind === 'single') {
    image = (
      <FrameDataImage
        frameData={frameData}
        contain={true}
        smoothing={false}
      />
    );
  }
  else {
    if (COMPOSITE_MULTI_LAYERS || frameData.layers.length === 0) {
      image = (
        <FrameDataCompositeImage
          frameData={frameData}
          contain={true}
          smoothing={false}
        />
      );
    }
    else {
      const firstLayer = frameData.layers[0];

      image = (
        <FrameDataImage
          frameData={firstLayer}
          contain={true}
          smoothing={false}
        />
      );
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
