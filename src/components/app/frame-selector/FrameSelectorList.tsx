import FrameSelectorListContent from "@/components/app/frame-selector/FrameSelectorListContent";
import ListWrapper from "@/components/app/frame-selector/ListWrapper";
import { S } from "@/lib/state/store/store-helper";

export default function FrameSelectorList() {
  // console.log('Rendering FrameSelectorList');

  const activeEntryFramesLength = S.useStore()((state) => state.getActiveEntry()?.frames.length);
  const setActiveFrameIndex = S.useStore()((state) => state.setActiveFrameIndex);

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
