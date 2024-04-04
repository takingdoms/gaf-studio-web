import ImportGaf from '@/components/app/importer/gaf-importer/ImportGaf';
import ImportTafPair from '@/components/app/importer/taf-importer/ImportTafPair';
import ImportTafSolo from '@/components/app/importer/taf-importer/ImportTafSolo';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

type ImportProps = {
  type: 'frames' | 'subframes';
  onAbort: () => void;
  onEnded: () => void;
};

export default function Import({
  type,
  onAbort,
  onEnded,
}: ImportProps) {
  const format = S.useFormat();

  if (format === 'gaf') {
    return (
      <ImportGaf
        type={type}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  if (format === 'taf-solo') {
    return (
      <ImportTafSolo
        type={type}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  return (
    <ImportTafPair
      type={type}
      onEnded={onEnded}
      onAbort={onAbort}
    />
  );
}
