import FrameSelectorItem from "@/components/app/frame-selector/FrameSelectorItem";
import { FRAME_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";
import LibGaf from "lib-gaf";
import { DeepReadonly } from "ts-essentials";

type FrameSelectorProps = DeepReadonly<{
  frames: LibGaf.GafFrame[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}>;

export default function FrameSelector({
  frames,
  selectedIndex,
  setSelectedIndex,
}: FrameSelectorProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="font-bold text-sm text-gray-700 mb-0.5">
        Frames:
      </div>

      <div
        className="grow flex overflow-x-scroll space-x-1.5 pb-1"
        style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT }}
      >
        {frames.map((frame, index) => {
          return (
            <FrameSelectorItem
              key={index}
              index={index}
              isSelected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
