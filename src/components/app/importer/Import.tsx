import ImportTaf from '@/components/app/importer/ImportTaf';
import ImportGaf from '@/components/app/importer/gaf-importer/ImportGaf';
import { useWorkspaceStore } from '@/lib/react/use-workspace-store';

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
  const useGafStore = useWorkspaceStore('gaf');
  const useTafStore = useWorkspaceStore('taf');

  if (useGafStore !== null) {
    return (
      <ImportGaf
        type={type}
        useGafStore={useGafStore}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  if (useTafStore !== null) {
    return (
      <ImportTaf
        type={type}
        useTafStore={useTafStore}
        onEnded={onEnded}
        onAbort={onAbort}
      />
    );
  }

  throw new Error(`Invalid store`);
}
