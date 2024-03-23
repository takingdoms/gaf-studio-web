import CompositeFrameSelector from '@/components/app/frame-selector/thumbnail-mode/CompositeFrameSelector';
import FrameSelector from '@/components/app/frame-selector/thumbnail-mode/FrameSelector';
import FrameSelectorAdder from '@/components/app/frame-selector/thumbnail-mode/FrameSelectorAdder';
import SelectorWrapper from '@/components/app/frame-selector/thumbnail-mode/SelectorWrapper';
import SelectorWrapperScroller from '@/components/app/frame-selector/thumbnail-mode/SelectorWrapperScroller';
import React from 'react';

type ThumbnailListContentProps = {
  type: 'frames' | 'subframes';
  itemLength: number;
  renderItem: (index: number) => React.ReactNode;
} & (
  {
    type: 'frames';
    showCompositeSelector?: never;
  }
  |
  {
    type: 'subframes';
    showCompositeSelector: boolean;
  }
);

export default function ThumbnailListContent({
  type,
  itemLength,
  renderItem,
  showCompositeSelector,
}: ThumbnailListContentProps) {
  return (
    <SelectorWrapper>
      {showCompositeSelector && <CompositeFrameSelector />}

      {itemLength > 0 && (
        <SelectorWrapperScroller>
          {Array.from({ length: itemLength }).map((_, index) => renderItem(index))}
        </SelectorWrapperScroller>
      )}

      <FrameSelectorAdder type={type} />
    </SelectorWrapper>
  );
}
