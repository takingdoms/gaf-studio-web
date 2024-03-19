import FrameSelectorItem from '@/components/app/frame-selector/thumbnail-mode/FrameSelectorItem';
import { S } from '@/lib/state/store/store-helper';

type SubframeSelectorRealProps = {
  frameIndex: number;
  subframeIndex: number;
  setActiveSubframeIndex: (subframeIndex: number) => void;
};

// TODO rename the current FrameSelector to FrameSelectorList and this one to FrameSelector
export default function SubframeSelector({
  frameIndex,
  subframeIndex,
  setActiveSubframeIndex,
}: SubframeSelectorRealProps) {
  // console.log('Rendering SubframeSelector');

  // TODO make a helper function for this inside S
  const frameData = S.useStore()((state) => {
    const frameData = state.getActiveEntry()!.frames[frameIndex].frameData;
    if (frameData.kind === 'single') {
      throw new Error(`Can't use this component for single-layered frameData.`);
    }
    return frameData.layers[subframeIndex];
  });

  const isSelected = S.useStore()((state) => state.cursor.subframeIndex === subframeIndex);

  return (
    <FrameSelectorItem
      index={subframeIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(subframeIndex)}
    />
  );
}
