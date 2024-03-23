import MinimalItem from '@/components/app/frame-selector/minimal-mode/MinimalItem';
import MinimalListContent from '@/components/app/frame-selector/minimal-mode/MinimalListContent';
import FrameSelector from '@/components/app/frame-selector/thumbnail-mode/FrameSelector';
import ThumbnailListContent from '@/components/app/frame-selector/thumbnail-mode/ThumbnailListContent';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';

type FrameSelectorListContentProps = {
  activeEntryFramesLength: number;
  setActiveFrameIndex: (frameIndex: number) => void;
};

export default function FrameSelectorListContent({
  activeEntryFramesLength,
  setActiveFrameIndex,
}: FrameSelectorListContentProps) {
  const listMode = useGlobalConfigStore((state) => state.frameListMode);

  if (listMode === 'thumbs') {
    return (
      <ThumbnailListContent
        type="frames"
        itemLength={activeEntryFramesLength}
        renderItem={(frameIndex) => (
          <FrameSelector
            key={frameIndex}
            frameIndex={frameIndex}
            setActiveFrameIndex={setActiveFrameIndex}
          />
        )}
      />
    );
  }

  if (listMode === 'minimal') {
    return (
      <MinimalListContent
        type="frames"
        itemLength={activeEntryFramesLength}
        renderItem={(frameIndex) => (
          <MinimalItem
            key={frameIndex}
            type="frame"
            index={frameIndex}
            onClick={() => setActiveFrameIndex(frameIndex)}
          />
        )}
      />
    );
  }

  // listMode === 'collapsed'
  return null;
}
