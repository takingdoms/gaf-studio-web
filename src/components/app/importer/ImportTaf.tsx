type ImportTafProps = {
  type: 'frames' | 'subframes';
  onEnded: () => void;
  onAbort: () => void;
};

export default function ImportTaf({
  type,
  onEnded,
  onAbort,
}: ImportTafProps) {
  return (
    <div>
      TODO: ImportTaf component
    </div>
  );
}
