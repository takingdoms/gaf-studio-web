import ThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/ThumbnailItem';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ThumbnailFrameSelectorProps = {
  frameIndex: number;
  setActiveFrameIndex: (frameIndex: number) => void;
};

export default function ThumbnailFrameSelector({
  frameIndex,
  setActiveFrameIndex,
}: ThumbnailFrameSelectorProps) {
  // console.log('Rendering ThumbnailFrameSelector');

  const frameData = S.useFrameDataAt(frameIndex);
  const isSelected = S.useIsFrameSelectedAt(frameIndex);

  return (
    <ThumbnailItem
      index={frameIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveFrameIndex(frameIndex)}
    />
  );
}
