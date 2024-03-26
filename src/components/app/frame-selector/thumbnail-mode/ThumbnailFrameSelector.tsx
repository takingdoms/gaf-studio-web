import ThumbnailItem from '@/components/app/frame-selector/thumbnail-mode/ThumbnailItem';
import { S } from '@/lib/state/store/store-helper';

type ThumbnailFrameSelectorProps = {
  frameIndex: number;
  setActiveFrameIndex: (frameIndex: number) => void;
};

export default function ThumbnailFrameSelector({
  frameIndex,
  setActiveFrameIndex,
}: ThumbnailFrameSelectorProps) {
  // console.log('Rendering ThumbnailFrameSelector');

  // TODO make a helper function for this inside S
  const frameData = S.useStore()((state) => state.getActiveEntry()!.frames[frameIndex].frameData);
  const isSelected = S.useStore()((state) => state.cursor.frameIndex === frameIndex);

  return (
    <ThumbnailItem
      index={frameIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveFrameIndex(frameIndex)}
    />
  );
}
