import CompositeFrameSelector from '@/components/app/frame-selector/thumbnail-mode/CompositeFrameSelector';
import NotMultiLayered from '@/components/app/frame-selector/thumbnail-mode/NotMultiLayeredItem';
import SelectorWrapper from '@/components/app/frame-selector/thumbnail-mode/SelectorWrapper';
import SubframeSelector from '@/components/app/frame-selector/thumbnail-mode/SubframeSelector';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';

type SubframeSelectorListContentProps = {
  activeFrameLayersLength: number | null; // null = current frame is not multi-layered
  activeFrameIndex: number;
  setActiveSubframeIndex: (activeSubframeIndex: number) => void;
};

export default function SubframeSelectorListContent({
  activeFrameLayersLength,
  activeFrameIndex,
  setActiveSubframeIndex,
}: SubframeSelectorListContentProps) {
  const listMode = useGlobalConfigStore((state) => state.subframeListMode);

  if (listMode === 'thumbs') {
    return (
      <SelectorWrapper>
        {activeFrameLayersLength !== null ? <CompositeFrameSelector /> : <NotMultiLayered />}

        {Array.from({ length: activeFrameLayersLength ?? 0 }).map((_, layerIndex) => {
          return (
            <SubframeSelector
              key={layerIndex}
              frameIndex={activeFrameIndex}
              subframeIndex={layerIndex}
              setActiveSubframeIndex={setActiveSubframeIndex}
            />
          );
        })}
      </SelectorWrapper>
    );
  }

  // collapsed!
  return null;
}
