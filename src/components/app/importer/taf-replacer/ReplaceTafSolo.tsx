import ReplaceLocationInfo from '@/components/app/importer/common-replacer/ReplaceLocationInfo';
import ImportTafWizard from '@/components/app/importer/taf-importer/ImportTafWizard';
import SolidButton from '@/components/ui/button/SolidButton';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { TafSoloS } from '@/lib/state/workspace/workspace-context/taf-solo-workspace-helper';
import { VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ReplaceTafSoloProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
  frameData: VirtualFrameDataSingleLayer;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ReplaceTafSolo({
  target,
  frameData,
  onAbort,
  onEnded,
}: ReplaceTafSoloProps) {
  const [showPrelude, setShowPrelude] = React.useState(true);

  const subFormat = TafSoloS.useSubFormat();

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
      <ImportTafWizard
        replacing={frameData}
        target={{
          kind: 'taf-solo',
          subFormat,
        }}
        onFinish={onFinish}
        onAbort={onAbort}
      />
    </div>
  );
}
