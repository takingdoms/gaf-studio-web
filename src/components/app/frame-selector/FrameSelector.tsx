import FrameSelectorItem from "@/components/app/frame-selector/FrameSelectorItem";
import SelectorWrapper from "@/components/app/frame-selector/SelectorWrapper";
import { VirtualGafFrame } from "@/lib/virtual-gaf/virtual-gaf";

type FrameSelectorProps = {
  frames: readonly VirtualGafFrame[];
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
