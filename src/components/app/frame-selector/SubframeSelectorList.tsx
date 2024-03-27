import ListWrapper from "@/components/app/frame-selector/ListWrapper";
import SubframeSelectorListContent from "@/components/app/frame-selector/SubframeSelectorListContent";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function SubframeSelectorList() {
  // console.log('Rendering SubframeSelectorList');

  const activeFrameLayersLength = S.useOptionalActiveFrameLayersLength();
  const activeFrameIndex = S.useActiveFrameIndex();
  const setActiveSubframeIndex = S.useSetActiveSubframeIndex();

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
