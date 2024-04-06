import ReplaceLocationInfo from '@/components/app/importer/common-replacer/ReplaceLocationInfo';
import ImportGafWizard from '@/components/app/importer/gaf-importer/ImportGafWizard';
import SolidButton from '@/components/ui/button/SolidButton';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { GafS } from '@/lib/state/workspace/workspace-context/gaf-workspace-helper';
import { VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ReplaceGafProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
  frameData: VirtualFrameDataSingleLayer<'gaf'>;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ReplaceGaf({
  target,
  frameData,
  onAbort,
  onEnded,
}: ReplaceGafProps) {
  const [showPrelude, setShowPrelude] = React.useState(true);

  const currentPalette = GafS.useCurrentPalette();
  const setCurrentPalette = GafS.useSetCurrentPalette();

  const replaceFrameImageData = S.useReplaceFrameImageData();
  const replaceSubframeImageData = S.useReplaceSubframeImageData();

  const onFinish = React.useCallback((result: VirtualFrameDataSingleLayer) => {
    const { entryIndex, frameIndex, subframeIndex } = target;

    if (subframeIndex === undefined) {
      replaceFrameImageData(entryIndex, frameIndex, result);
    }
    else {
      replaceSubframeImageData(entryIndex, frameIndex, subframeIndex, result);
    }

    onEnded();
  }, [target, onEnded, replaceFrameImageData, replaceSubframeImageData]);

  if (showPrelude) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <ReplaceLocationInfo target={target} />
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
            onClick={() => setShowPrelude(false)}
          >
            Next
          </SolidButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minWidth: 600 }}>
      <ImportGafWizard
        replacing={frameData}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
        onFinish={onFinish}
        onAbort={onAbort}
      />
    </div>
  );
}
