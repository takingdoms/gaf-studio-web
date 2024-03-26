import SelectorItemsScroller from "@/components/app/frame-selector/common/SelectorItemsScroller";
import SelectorItemsWrapper from "@/components/app/frame-selector/common/SelectorItemsWrapper";
import CompositeMinimalItem from '@/components/app/frame-selector/minimal-mode/CompositeMinimalItem';
import MinimalAdder from '@/components/app/frame-selector/minimal-mode/MinimalAdder';
import { MINIMAL_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";
import React from 'react';

type MinimalListContentProps = {
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

export default function MinimalListContent({
  type,
  itemLength,
  renderItem,
  showCompositeItem,
}: MinimalListContentProps) {
  return (
    <SelectorItemsWrapper minHeight={MINIMAL_SELECTOR_ITEM_HEIGHT}>
      {showCompositeItem && <CompositeMinimalItem />}

      {itemLength > 0 && (
        <SelectorItemsScroller>
          {Array.from({ length: itemLength }).map((_, index) => renderItem(index))}
        </SelectorItemsScroller>
      )}

      <MinimalAdder type={type} />
    </SelectorItemsWrapper>
  );
}
