import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { DeepReadonly } from 'ts-essentials';

type WorkspaceInfoSourceFileProps = {
  currentGaf: DeepReadonly<CurrentGaf>;
};

export default function WorkspaceInfoSourceFile({ currentGaf }: WorkspaceInfoSourceFileProps) {
  const sourceFile = currentGaf.kind === 'from-file'
    ? currentGaf.fileName
    : undefined;

  return (
    <div
      className="truncate"
      title={sourceFile}
    >
      {sourceFile === undefined ? (
        <span className="text-gray-500">(None)</span>
      ) : (
        <span>{sourceFile}</span>
      )}
    </div>
  );
}
