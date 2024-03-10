import FrameSelector from "@/components/app/frame-selector/FrameSelector";
import SelectorWrapper from "@/components/app/frame-selector/SelectorWrapper";
import { S } from "@/lib/state/store/store-helper";

export default function FrameSelectorList() {
  // console.log('Rendering FrameSelectorList');

  const activeEntryFramesLength = S.useStore()((state) => state.getActiveEntry()?.frames.length);
  const setActiveFrameIndex = S.useStore()((state) => state.setActiveFrameIndex);

  if (activeEntryFramesLength === undefined) {
    return null;
  }

  return (
    <SelectorWrapper label="Frame">
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
