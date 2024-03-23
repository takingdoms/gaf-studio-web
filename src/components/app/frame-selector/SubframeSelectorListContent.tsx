import MinimalItem from '@/components/app/frame-selector/minimal-mode/MinimalItem';
import MinimalListContent from '@/components/app/frame-selector/minimal-mode/MinimalListContent';
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
        showCompositeItem={activeFrameLayersLength !== null}
      />
    );
  }

  if (listMode === 'minimal') {
    return (
      <MinimalListContent
        type="subframes"
        itemLength={activeFrameLayersLength ?? 0}
        renderItem={(layerIndex) => (
          <MinimalItem
            key={layerIndex}
            type="subframe"
            index={layerIndex}
            onClick={() => setActiveSubframeIndex(layerIndex)}
          />
        )}
        showCompositeItem={activeFrameLayersLength !== null}
      />
    );
  }

  // listMode === 'collapsed'
  return null;
}
