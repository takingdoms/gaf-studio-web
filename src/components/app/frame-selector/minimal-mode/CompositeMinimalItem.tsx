import { MINIMAL_SELECTOR_ITEM_WIDTH, MINIMAL_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import { Icons } from '@/lib/react/icons';
import { S } from '@/lib/state/store/store-helper';

// TODO reuse code from MinimalItem
export default function CompositeMinimalItem() {
  const isSelected = S.useStore()((state) => state.cursor.subframeIndex === null);
  const setActiveSubframeIndex = S.useStore()((state) => state.setActiveSubframeIndex);

  const onClick = () => setActiveSubframeIndex(null);

  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-gray-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

  return (
    <div
      className={`shrink-0 bg-white border-2 text-xs flex flex-col justify-center items-center`
        + ` overflow-hidden select-none leading-none ${borderCls} ${cursorCls} ${textCls}`}
      style={{
        width: MINIMAL_SELECTOR_ITEM_WIDTH,
        height: MINIMAL_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={isSelected ? undefined : onClick}
    >
      <Icons.CompositeSubframes size={20} />
    </div>
  );
}
