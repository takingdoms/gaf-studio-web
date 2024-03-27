import FrameSelectorListContent from "@/components/app/frame-selector/FrameSelectorListContent";
import ListWrapper from "@/components/app/frame-selector/ListWrapper";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function FrameSelectorList() {
  // console.log('Rendering FrameSelectorList');

  const activeEntryFramesLength = S.useOptionalActiveEntryFramesLength();
  const setActiveFrameIndex = S.useSetActiveFrameIndex();

  if (activeEntryFramesLength === undefined) {
    return null;
  }

  return (
    <ListWrapper type="frames">
      <FrameSelectorListContent
        activeEntryFramesLength={activeEntryFramesLength}
        setActiveFrameIndex={setActiveFrameIndex}
      />
    </ListWrapper>
  );
}
