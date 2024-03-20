import MinimalItem from '@/components/app/frame-selector/minimal-mode/MinimalItem';
import MinimalWrapper from '@/components/app/frame-selector/minimal-mode/MinimalWrapper';
import FrameSelector from '@/components/app/frame-selector/thumbnail-mode/FrameSelector';
import SelectorWrapper from '@/components/app/frame-selector/thumbnail-mode/SelectorWrapper';
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
      <SelectorWrapper>
        {Array.from({ length: activeEntryFramesLength }).map((_, frameIndex) => {
          return (
            <FrameSelector
              key={frameIndex}
              frameIndex={frameIndex}
              setActiveFrameIndex={setActiveFrameIndex}
            />
          );
        })}
      </SelectorWrapper>
    );
  }

  if (listMode === 'minimal') {
    return (
      <MinimalWrapper>
        {Array.from({ length: activeEntryFramesLength }).map((_, index) => (
          <MinimalItem
            key={index}
            type="frame"
            index={index}
            onClick={() => setActiveFrameIndex(index)}
          />
        ))}
      </MinimalWrapper>
    );
  }

  // listMode === 'collapsed'
  return null;
}
