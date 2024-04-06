import ImportTafWizard from '@/components/app/importer/taf-importer/ImportTafWizard';
import { TafImporting } from '@/components/app/importer/taf-importer/taf-importing-types';
import ReplaceTafPairSizeMismatch from '@/components/app/importer/taf-replacer/ReplaceTafPairSizeMismatch';
import ReplaceTafPairTargetForm from '@/components/app/importer/taf-replacer/ReplaceTafPairTargetForm';
import { ColoredImageResource } from '@/lib/image/image-resource';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { VirtualFrameDataSingleLayer, VirtualLayerDataRawColors, VirtualLayerDataRawColorsPair } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ReplaceTafPairProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
  frameData: VirtualFrameDataSingleLayer<'taf-pair'>;
  onAbort: () => void;
  onEnded: () => void;
};

export default function ReplaceTafPair({
  target,
  frameData,
  onAbort,
  onEnded,
}: ReplaceTafPairProps) {
  const [replaceTarget, setReplaceTarget] = React.useState<'taf_1555' | 'taf_4444' | 'both'>();
  const [dimensionMismatch, setDimensionMismatch] = React.useState<{ width: number; height: number }>();

  const replaceFrameImageData = S.useReplaceFrameImageData();
  const replaceSubframeImageData = S.useReplaceSubframeImageData();

  const onFinish = React.useCallback((result: VirtualFrameDataSingleLayer) => {
    // Important: if replaceTarget is a solo target, the result's VirtualLayerData needs to be
    // converted from a VirtualLayerDataRawColors to a VirtualLayerDataRawColorsPair or
    // absolute catastrophe ensues.
    if (replaceTarget !== 'both') {
      if (result.width !== frameData.width || result.height !== frameData.height) {
        setDimensionMismatch({ width: result.width, height: result.height });
        return;
      }

      const soloLayerData = result.layerData as VirtualLayerDataRawColors;

      let correctLayerData: VirtualLayerDataRawColorsPair;

      if (replaceTarget === 'taf_1555') {
        correctLayerData = {
          kind: 'raw-colors-pair',
          imageResource1555: soloLayerData.imageResource as ColoredImageResource<'argb1555'>,
          imageResource4444: frameData.layerData.imageResource4444,
        };
      }
      else {
        correctLayerData = {
          kind: 'raw-colors-pair',
          imageResource1555: frameData.layerData.imageResource1555,
          imageResource4444: soloLayerData.imageResource as ColoredImageResource<'argb4444'>,
        };
      }

      result = {
        ...result,
        layerData: correctLayerData,
      };
    }

    const { entryIndex, frameIndex, subframeIndex } = target;

    if (subframeIndex === undefined) {
      replaceFrameImageData(entryIndex, frameIndex, result);
    }
    else {
      replaceSubframeImageData(entryIndex, frameIndex, subframeIndex, result);
    }

    onEnded();
  }, [target, replaceTarget, frameData, onEnded, replaceFrameImageData, replaceSubframeImageData]);

  if (dimensionMismatch !== undefined) {
    return (
      <ReplaceTafPairSizeMismatch
        frameData={frameData}
        dimensionMismatch={dimensionMismatch}
        onNext={onAbort}
      />
    );
  }

  if (replaceTarget === undefined) {
    return (
      <ReplaceTafPairTargetForm
        target={target}
        onNext={setReplaceTarget}
        onAbort={onAbort}
      />
    );
  }

  const importingTarget: TafImporting.Target = replaceTarget === 'both'
    ? { kind: 'taf-pair' }
    : { kind: 'taf-solo', subFormat: replaceTarget };

  return (
    <div style={{ minWidth: 600 }}>
      <ImportTafWizard
        replacing={frameData}
        target={importingTarget}
        onFinish={onFinish}
        onAbort={onAbort}
      />
    </div>
  );
}
