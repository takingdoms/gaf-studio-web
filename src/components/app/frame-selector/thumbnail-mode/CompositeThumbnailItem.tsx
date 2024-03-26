import { FRAME_SELECTOR_ITEM_HEIGHT, FRAME_SELECTOR_ITEM_WIDTH } from '@/lib/constants';

type CompositeThumbnailItemProps = {
  isSelected: boolean;
  onClick: () => void;
};

// TODO reuse code from ThumbnailItem
export default function CompositeThumbnailItem({
  isSelected,
  onClick,
}: CompositeThumbnailItemProps) {
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
      onClick={isSelected ? undefined : onClick}
    >
      <div className="w-full h-full flex justify-center items-center">
        <span className={`font-bold font-mono ${textCls} text-xs text-center`}>
          (composite)
        </span>
      </div>
    </div>
  );
}
