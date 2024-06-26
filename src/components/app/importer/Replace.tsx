import ReplaceGaf from '@/components/app/importer/gaf-replacer/ReplaceGaf';
import ReplaceTafPair from '@/components/app/importer/taf-replacer/ReplaceTafPair';
import ReplaceTafSolo from '@/components/app/importer/taf-replacer/ReplaceTafSolo';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';

type ReplaceProps = {
  target: { entryIndex: number; frameIndex: number; subframeIndex?: number };
  frameData: VirtualFrameDataSingleLayer;
  onAbort: () => void;
  onEnded: () => void;
};

export default function Replace({
  target,
  frameData,
  onAbort,
  onEnded,
}: ReplaceProps) {
  const format = S.useFormat();

  if (format === 'gaf') {
    return (
      <ReplaceGaf
        target={target}
        frameData={frameData as VirtualFrameDataSingleLayer<'gaf'>}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }

  if (format === 'taf-solo') {
    return (
      <ReplaceTafSolo
        target={target}
        frameData={frameData as VirtualFrameDataSingleLayer<'taf-solo'>}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }

  return (
    <ReplaceTafPair
      target={target}
      frameData={frameData as VirtualFrameDataSingleLayer<'taf-pair'>}
      onAbort={onAbort}
      onEnded={onEnded}
    />
  );
}
