import Import from '@/components/app/importer/Import';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ImportModalProps = {
  type: 'frames' | 'subframes';
  close: () => void;
};

export default function ImportModal({
  type,
  close,
}: ImportModalProps) {
  const activeEntryIndex = S.useActiveEntryIndex();
  const activeFrameIndex = S.useActiveFrameIndex();

  if (activeEntryIndex === null) {
    return <div className="p-4">No entry selected.</div>;
  }

  if (type === 'subframes' && activeFrameIndex === null) {
    return <div className="p-4">No frame selected.</div>;
  }

  return (
    <div style={{ minWidth: 480 }}>
      <Import
        type={type}
        onAbort={close}
        onEnded={close}
      />
    </div>
  );
}
