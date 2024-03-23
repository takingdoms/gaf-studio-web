import CompositeMinimalItem from '@/components/app/frame-selector/minimal-mode/CompositeMinimalItem';
import MinimalAdder from '@/components/app/frame-selector/minimal-mode/MinimalAdder';
import MinimalWrapper from '@/components/app/frame-selector/minimal-mode/MinimalWrapper';
import SelectorWrapperScroller from '@/components/app/frame-selector/thumbnail-mode/SelectorWrapperScroller';
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
    <MinimalWrapper>
      {showCompositeItem && <CompositeMinimalItem />}

      {itemLength > 0 && (
        <SelectorWrapperScroller>
          {Array.from({ length: itemLength }).map((_, index) => renderItem(index))}
        </SelectorWrapperScroller>
      )}

      <MinimalAdder type={type} />
    </MinimalWrapper>
  );
}
