import { TafWorkspaceStore } from '@/lib/react/workspace-store-context';

type ImportTafProps = {
  type: 'frames' | 'subframes';
  useTafStore: TafWorkspaceStore;
  onEnded: () => void;
  onAbort: () => void;
};

export default function ImportTaf({
  type,
  useTafStore,
  onEnded,
  onAbort,
}: ImportTafProps) {
  return (
    <div>
      TODO: ImportTaf component
    </div>
  );
}
