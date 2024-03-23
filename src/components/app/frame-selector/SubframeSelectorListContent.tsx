import NotMultiLayered from '@/components/app/frame-selector/NotMultiLayeredItem';
import CompositeMinimalItem from '@/components/app/frame-selector/minimal-mode/CompositeMinimalItem';
import MinimalItem from '@/components/app/frame-selector/minimal-mode/MinimalItem';
import MinimalWrapper from '@/components/app/frame-selector/minimal-mode/MinimalWrapper';
import SubframeSelector from '@/components/app/frame-selector/thumbnail-mode/SubframeSelector';
import ThumbnailListContent from '@/components/app/frame-selector/thumbnail-mode/ThumbnailListContent';
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
      <ThumbnailListContent
        type="subframes"
        itemLength={activeFrameLayersLength ?? 0}
        renderItem={(layerIndex) => (
          <SubframeSelector
            key={layerIndex}
            frameIndex={activeFrameIndex}
            subframeIndex={layerIndex}
            setActiveSubframeIndex={setActiveSubframeIndex}
          />
        )}
        showCompositeSelector={activeFrameLayersLength !== null}
      />
    );
  }

  if (listMode === 'minimal') {
    return (
      <MinimalWrapper>
        {activeFrameLayersLength !== null ? <CompositeMinimalItem /> : <NotMultiLayered />}

        {Array.from({ length: activeFrameLayersLength ?? 0 }).map((_, index) => (
          <MinimalItem
            key={index}
            type="subframe"
            index={index}
            onClick={() => setActiveSubframeIndex(index)}
          />
        ))}
      </MinimalWrapper>
    );
  }

  // listMode === 'collapsed'
  return null;
}
