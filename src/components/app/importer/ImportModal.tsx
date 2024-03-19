import Import from '@/components/app/importer/Import';

type ImportModalProps = {
  type: 'frames' | 'subframes';
  close: () => void;
};

export default function ImportModal({
  type,
  close,
}: ImportModalProps) {
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
