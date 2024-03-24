import Import from '@/components/app/importer/Import';
import { S } from '@/lib/state/store/store-helper';

type ImportModalProps = {
  type: 'frames' | 'subframes';
  close: () => void;
};

export default function ImportModal({
  type,
  close,
}: ImportModalProps) {
  const activeEntryIndex = S.useStore()((state) => state.cursor.entryIndex);
  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);

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
