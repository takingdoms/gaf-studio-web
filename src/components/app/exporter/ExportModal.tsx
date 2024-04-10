import Export from '@/components/app/exporter/Export';

type ExportModalProps = {
  close: () => void;
};

export default function ExportModal({
  close,
}: ExportModalProps) {
  return (
    <div style={{ minWidth: 600 }}>
      <Export
        onAbort={close}
        onEnded={close}
      />
    </div>
  );
}
