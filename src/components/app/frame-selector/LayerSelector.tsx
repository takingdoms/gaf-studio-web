import CompositeFrameSelectorItem from '@/components/app/frame-selector/CompositeFrameSelectorItem';
import FrameSelectorItem from '@/components/app/frame-selector/FrameSelectorItem';
import { FRAME_SELECTOR_ITEM_HEIGHT } from '@/lib/constants';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type LayerSelectorProps = DeepReadonly<{
  layers: LibGaf.GafFrameDataSingleLayer[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}>;

export default function LayerSelector({
  layers,
  selectedIndex,
  setSelectedIndex,
}: LayerSelectorProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="font-bold text-sm text-gray-700 mb-0.5">
        Subframes:
      </div>

      <div
        className="grow flex overflow-x-scroll space-x-1.5 pb-1"
        style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT }}
      >
        <CompositeFrameSelectorItem
          isSelected={selectedIndex === null}
          onClick={() => setSelectedIndex(null)}
        />

        {layers.map((layer, index) => {
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
