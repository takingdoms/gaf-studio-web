import CompositeThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/CompositeThumbnailItem';
import { S } from '@/lib/state/store/store-helper';

export default function CompositeThumbnailSelector() {
  // console.log('Rendering CompositeThumbnailSelector');

  const isSelected = S.useStore()((state) => state.cursor.subframeIndex === null);
  const setActiveSubframeIndex = S.useStore()((state) => state.setActiveSubframeIndex);

  return (
    <CompositeThumbnailItem
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(null)}
    />
  );
}
