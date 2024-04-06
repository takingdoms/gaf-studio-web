import Import from '@/components/app/importer/Import';
import Replace from '@/components/app/importer/Replace';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ReplaceModalProps = {
  close: () => void;
};

export default function ReplaceModal({ close }: ReplaceModalProps) {
  const entryIndex = S.useActiveEntryIndex();

  if (entryIndex === null) {
    return <div className="p-4">No entry selected.</div>;
  }

  return (
    <ReplaceFrameModal
      close={close}
      entryIndex={entryIndex}
    />
  );
}

function ReplaceFrameModal({
  close,
  entryIndex,
}: ReplaceModalProps & { entryIndex: number }) {
  const frameIndex = S.useActiveFrameIndex();
  const frame = S.useActiveFrame();

  if (frameIndex === null || frame === null) {
    return <div className="p-4">No frame selected.</div>;
  }

  if (frame.frameData.kind === 'single') {
    return (
      <Replace
        target={{ entryIndex, frameIndex }}
        frameData={frame.frameData}
        onAbort={close}
        onEnded={close}
      />
    );
  }

  return (
    <ReplaceSubframeModal
      close={close}
      entryIndex={entryIndex}
      frameIndex={frameIndex}
    />
  );
}

function ReplaceSubframeModal({
  close,
  entryIndex,
  frameIndex,
}: ReplaceModalProps & { entryIndex: number; frameIndex: number }) {
  const subframeIndex = S.useActiveSubframeIndex();
  const subframe = S.useActiveSubframe();

  if (subframeIndex === null || subframe === null) {
    return <div className="p-4">No subframe selected.</div>;
  }

  return (
    <Replace
      target={{ entryIndex, frameIndex, subframeIndex }}
      frameData={subframe}
      onAbort={close}
      onEnded={close}
    />
  );
}
