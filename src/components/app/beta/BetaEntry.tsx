import BetaFrame from '@/components/app/beta/BetaFrame';
import { S } from '@/lib/state/store/store-helper';

type BetaEntryProps = {
  entryIndex: number;
};

export default function BetaEntry({ entryIndex }: BetaEntryProps) {
  console.log('Rendering BetaEntry ' + entryIndex);

  const { name, framesLength } = S.useEntryProps(entryIndex);

  return (
    <div className="border border-dotted border-red-500 px-2 py-1 mb-1">
      #{entryIndex} - {name} - {framesLength} frames

      <ul className="list-disc pl-4">
        {Array.from({ length: framesLength }).map((_, frameIndex) => (
          <BetaFrame
            key={frameIndex}
            entryIndex={entryIndex}
            frameIndex={frameIndex}
          />
        ))}
      </ul>
    </div>
  );
}
