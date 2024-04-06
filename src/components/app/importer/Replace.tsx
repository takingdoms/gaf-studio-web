import ReplaceGaf from '@/components/app/importer/gaf-replacer/ReplaceGaf';
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
        frameData={frameData}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }

  if (format === 'taf-solo') {
    return (
      <ReplaceTafSolo
        target={target}
        frameData={frameData}
        onAbort={onAbort}
        onEnded={onEnded}
      />
    );
  }

  return 'Format unsupported (TODO)';
}
