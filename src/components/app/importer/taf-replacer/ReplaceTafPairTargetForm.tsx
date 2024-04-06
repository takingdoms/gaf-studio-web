import ReplaceLocationInfo from '@/components/app/importer/common-replacer/ReplaceLocationInfo';
import SolidButton from '@/components/ui/button/SolidButton';
import React from 'react';

type ReplaceTafPairTargetFormProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
  onNext: (target: 'taf_1555' | 'taf_4444' | 'both') => void;
  onAbort: () => void;
};

export default function ReplaceTafPairTargetForm({
  target,
  onNext,
  onAbort,
}: ReplaceTafPairTargetFormProps) {
  const [replaceTarget, setReplaceTarget] = React.useState<'taf_1555' | 'taf_4444' | 'both'>();

  return (
    <div className="p-4">
      <div className="mb-2">
        <ReplaceLocationInfo target={target} />
      </div>

      <div className="mb-4">
        <div className="text-sm font-bold mb-0.5">Select which image data you want to replace:</div>
        <div className="text-xs font-semibold mb-1">
          Note that when replacing individual image data (1555 or 4444) the dimensions of the{' '}
          new image must match the dimensions of the old image.
          <br />
          This is because the image data for both subformats (1555 and 4444) must always be the same.
          <br />
          Of course, you don't have to worry about this if you select the "Both" option.
        </div>
        <ul className="pl-2">
          <li className="py-1">
            <label className="flex items-center space-x-1.5">
              <input
                type="radio"
                name="target"
                checked={replaceTarget === 'taf_1555'}
                onChange={() => setReplaceTarget('taf_1555')}
              />
              <span>1555 image data</span>
            </label>
          </li>
          <li className="py-1">
            <label className="flex items-center space-x-1.5">
              <input
                type="radio"
                name="target"
                checked={replaceTarget === 'taf_4444'}
                onChange={() => setReplaceTarget('taf_4444')}
              />
              <span>4444 image data</span>
            </label>
          </li>
          <li className="py-1">
            <label className="flex items-center space-x-1.5">
              <input
                type="radio"
                name="target"
                checked={replaceTarget === 'both'}
                onChange={() => setReplaceTarget('both')}
              />
              <span>Both</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="flex justify-between space-x-2">
        <SolidButton
          color="default"
          onClick={onAbort}
        >
          Cancel
        </SolidButton>
        <SolidButton
          color="success"
          disabled={replaceTarget === undefined}
          onClick={() => {
            if (replaceTarget !== undefined) {
              onNext(replaceTarget);
            }
          }}
        >
          Next
        </SolidButton>
      </div>
    </div>
  );
}
