import ListWrapper from "@/components/app/frame-selector/ListWrapper";
import SubframeSelectorListContent from "@/components/app/frame-selector/SubframeSelectorListContent";
import { S } from "@/lib/state/store/store-helper";

export default function SubframeSelectorList() {
  // console.log('Rendering SubframeSelectorList');

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
    <ListWrapper type="subframes">
      <SubframeSelectorListContent
        activeFrameLayersLength={activeFrameLayersLength}
        activeFrameIndex={activeFrameIndex}
        setActiveSubframeIndex={setActiveSubframeIndex}
      />
    </ListWrapper>
  );
}
