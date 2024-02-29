import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';

type CompositeFrameSelectorItemProps = {
  isSelected: boolean;
  onClick: () => void;
};

export default function CompositeFrameSelectorItem({
  isSelected,
  onClick,
}: CompositeFrameSelectorItemProps) {
  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-slate-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

  return (
    <div
      className={`shrink-0 bg-white border-2 ${borderCls} ${cursorCls}`}
      style={{
        width: FRAME_SELECTOR_ITEM_WIDTH,
        height: FRAME_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={onClick}
    >
      <div className="w-full h-full flex justify-center items-center">
        <span className={`font-bold font-mono ${textCls} text-xs text-center`}>
          (Composite subframes)
        </span>
      </div>
    </div>
  );
}
