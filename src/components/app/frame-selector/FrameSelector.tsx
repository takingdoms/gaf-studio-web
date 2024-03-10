import FrameSelectorItem from '@/components/app/frame-selector/FrameSelectorItem';
import { S } from '@/lib/state/store/store-helper';

type FrameSelectorProps = {
  frameIndex: number;
  setActiveFrameIndex: (frameIndex: number) => void;
};

export default function FrameSelector({
  frameIndex,
  setActiveFrameIndex,
}: FrameSelectorProps) {
  // console.log('Rendering FrameSelector');

  // TODO make a helper function for this inside S
  const frameData = S.useStore()((state) => state.getActiveEntry()!.frames[frameIndex].frameData);
  const isSelected = S.useStore()((state) => state.cursor.frameIndex === frameIndex);

  return (
    <FrameSelectorItem
      index={frameIndex}
      frameData={frameData}
      isSelected={isSelected}
      onClick={() => setActiveFrameIndex(frameIndex)}
    />
  );
}
