import SelectorItemsScroller from "@/components/app/frame-selector/common/SelectorItemsScroller";
import SelectorItemsWrapper from "@/components/app/frame-selector/common/SelectorItemsWrapper";
import CompositeThumbnailSelector from '@/components/app/frame-selector/thumbnail-mode/CompositeThumbnailSelector';
import ThumbnailAdder from '@/components/app/frame-selector/thumbnail-mode/ThumbnailAdder';
import { FRAME_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";
import React from 'react';

type ThumbnailListContentProps = {
  type: 'frames' | 'subframes';
  itemLength: number;
  renderItem: (index: number) => React.ReactNode;
} & (
  {
    type: 'frames';
    showCompositeItem?: never;
  }
  |
  {
    type: 'subframes';
    showCompositeItem: boolean;
  }
);

export default function ThumbnailListContent({
  type,
  itemLength,
  renderItem,
  showCompositeItem,
}: ThumbnailListContentProps) {
  return (
    <SelectorItemsWrapper minHeight={FRAME_SELECTOR_ITEM_HEIGHT}>
      {showCompositeItem && <CompositeThumbnailSelector />}

      {itemLength > 0 && (
        <SelectorItemsScroller>
          {Array.from({ length: itemLength }).map((_, index) => renderItem(index))}
        </SelectorItemsScroller>
      )}

      <ThumbnailAdder type={type} />
    </SelectorItemsWrapper>
  );
}
