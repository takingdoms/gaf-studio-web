import CompositeFrameSelectorItem from '@/components/app/frame-selector/CompositeFrameSelectorItem';
import FrameSelectorItem from '@/components/app/frame-selector/FrameSelectorItem';
import SelectorWrapper from '@/components/app/frame-selector/SelectorWrapper';
import { VirtualGafFrameDataSingleLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { DeepReadonly } from 'ts-essentials';

type LayerSelectorProps = DeepReadonly<{
  layers: VirtualGafFrameDataSingleLayer[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}>;

// TODO reuse code from FrameSelector?
export default function LayerSelector({
  layers,
  selectedIndex,
  setSelectedIndex,
}: LayerSelectorProps) {
  return (
    <SelectorWrapper label="Subframe">
      <CompositeFrameSelectorItem
        isSelected={selectedIndex === null}
        onClick={() => setSelectedIndex(null)}
      />

      {layers.map((layer, index) => {
        return (
          <FrameSelectorItem
            key={index}
            index={index}
            frameData={layer}
            isSelected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        );
      })}
    </SelectorWrapper>
  );
}
