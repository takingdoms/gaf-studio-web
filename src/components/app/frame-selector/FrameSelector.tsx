import FrameSelectorItem from "@/components/app/frame-selector/FrameSelectorItem";
import SelectorWrapper from "@/components/app/frame-selector/SelectorWrapper";
import { FRAME_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";
import { VirtualGafFrame } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { DeepReadonly } from "ts-essentials";

type FrameSelectorProps = {
  frames: VirtualGafFrame[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
};

export default function FrameSelector({
  frames,
  selectedIndex,
  setSelectedIndex,
}: FrameSelectorProps) {
  return (
    <SelectorWrapper label="Frame">
      {frames.map((frame, index) => {
        return (
          <FrameSelectorItem
            key={index}
            index={index}
            frameData={frame.frameData}
            isSelected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        );
      })}
    </SelectorWrapper>
  );
}
