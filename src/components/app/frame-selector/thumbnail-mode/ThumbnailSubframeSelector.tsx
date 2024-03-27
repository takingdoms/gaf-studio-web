import ThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/ThumbnailItem';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

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

  const frameData = S.useSubframeDataAt(frameIndex, subframeIndex);
  const isSelected = S.useIsSubframeSelectedAt(subframeIndex);

  return (
    <ThumbnailItem
      index={subframeIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveSubframeIndex(subframeIndex)}
    />
  );
}
