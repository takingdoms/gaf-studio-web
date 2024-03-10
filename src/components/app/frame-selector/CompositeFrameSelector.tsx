import CompositeFrameSelectorItem from '@/components/app/frame-selector/CompositeFrameSelectorItem';
import { S } from '@/lib/state/store/store-helper';

export default function CompositeFrameSelector() {
  // console.log('Rendering CompositeFrameSelector');

  const isSelected = S.useStore()((state) => state.cursor.subframeIndex === null);
  const setActiveSubframeIndex = S.useStore()((state) => state.setActiveSubframeIndex);

  return (
    <CompositeFrameSelectorItem
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(null)}
    />
  );
}
