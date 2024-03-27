import CompositeThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/CompositeThumbnailItem';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function CompositeThumbnailSelector() {
  // console.log('Rendering CompositeThumbnailSelector');

  const isSelected = S.useHasActiveSubframe() === false;
  const setActiveSubframeIndex = S.useSetActiveSubframeIndex();

  return (
    <CompositeThumbnailItem
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(null)}
    />
  );
}
