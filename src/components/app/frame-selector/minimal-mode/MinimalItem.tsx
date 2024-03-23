import { MINIMAL_SELECTOR_ITEM_WIDTH, MINIMAL_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import { S } from '@/lib/state/store/store-helper';
import React from 'react';

type MinimalItemProps = {
  type: 'frame' | 'subframe';
  index: number;
  onClick: () => void;
};

export default function MinimalItem({
  type,
  index,
  onClick,
}: MinimalItemProps) {
  const divRef = React.useRef<HTMLDivElement>(null);

  const isSelected = S.useStore()((state) => {
    return index === (
      type === 'frame' ? state.cursor.frameIndex : state.cursor.subframeIndex
    );
  });

  React.useEffect(() => {
    const div = divRef.current;

    if (!isSelected || div === null) {
      return;
    }

    div.scrollIntoView({ behavior: 'smooth' });
  }, [isSelected]);

  const subFrames = S.useStore()((state) => {
    if (type === 'subframe') {
      return null;
    }

    const frameData = state.getActiveEntry()!.frames[index].frameData;

    if (frameData.kind === 'single') {
      return null;
    }

    return frameData.layers.length;
  });

  const borderCls = isSelected ? 'border-blue-500' : 'border-gray-300';
  const textCls = isSelected ? 'text-blue-500' : 'text-gray-400';
  const cursorCls = isSelected ? 'cursor-default' : 'cursor-pointer';

  return (
    <div
      ref={divRef}
      className={`shrink-0 bg-white border-2 text-xs flex flex-col justify-center items-center`
        + ` overflow-hidden select-none leading-none ${borderCls} ${cursorCls} ${textCls}`}
      style={{
        width: MINIMAL_SELECTOR_ITEM_WIDTH,
        height: MINIMAL_SELECTOR_ITEM_HEIGHT,
      }}
      onClick={isSelected ? undefined : onClick}
    >
      <div
        className="font-bold"
        style={{ marginBottom: 1 }}
      >
        {index + 1}
      </div>

      {subFrames !== null ? (
        <div>
          x{subFrames}
        </div>
      ) : (
        <div className="invisible">
          0
        </div>
      )}
    </div>
  );
}
