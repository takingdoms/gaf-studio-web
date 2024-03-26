import ThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/ThumbnailItem';
import { S } from '@/lib/state/store/store-helper';

type ThumbnailSubframeSelectorRealProps = {
  frameIndex: number;
  subframeIndex: number;
  setActiveSubframeIndex: (subframeIndex: number) => void;
};

export default function ThumbnailSubframeSelector({
  frameIndex,
  subframeIndex,
  setActiveSubframeIndex,
}: ThumbnailSubframeSelectorRealProps) {
  // console.log('Rendering ThumbnailSubframeSelector');

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
    <ThumbnailItem
      index={subframeIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(subframeIndex)}
    />
  );
}
