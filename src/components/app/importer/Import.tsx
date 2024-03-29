import ImportTaf from '@/components/app/importer/ImportTaf';
import ImportGaf from '@/components/app/importer/gaf-importer/ImportGaf';
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
  const format = S.useGafFormat();

  if (format === 'gaf') {
    return (
      <ImportGaf
        type={type}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  if (format === 'taf') {
    return (
      <ImportTaf
        type={type}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  throw new Error(`Invalid store`);
}
