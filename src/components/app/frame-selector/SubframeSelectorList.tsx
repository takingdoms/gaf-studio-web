import CompositeFrameSelector from "@/components/app/frame-selector/CompositeFrameSelector";
import SelectorWrapper from "@/components/app/frame-selector/SelectorWrapper";
import SubframeSelector from "@/components/app/frame-selector/SubframeSelector";
import { S } from "@/lib/state/store/store-helper";

export default function SubframeSelectorList() {
  // console.log('Rendering SubframeSelectorList');

  // TODO S. helper
  const activeFrameLayersLength = S.useStore()((state) => {
    const frame = state.getActiveFrame();

    if (!frame) {
      return null;
    }

    return frame.frameData.kind === 'multi'
      ? frame.frameData.layers.length
      : null;
  });

  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const setActiveSubframeIndex = S.useStore()((state) => state.setActiveSubframeIndex);

  if (activeFrameIndex === null) {
    return null;
  }

  return (
    <SelectorWrapper label="Subframe">
      <CompositeFrameSelector />

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
