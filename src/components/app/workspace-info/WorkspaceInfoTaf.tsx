import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace";
import { DeepReadonly } from "ts-essentials";

type WorkspaceInfoTafProps = {
  workspaceTaf: DeepReadonly<WorkspaceTaf>;
};

export default function WorkspaceInfoTaf({ workspaceTaf }: WorkspaceInfoTafProps) {
  const currentGaf = workspaceTaf.activeSubFormat === null
    ? null
    : workspaceTaf.currentGafs[workspaceTaf.activeSubFormat];

  if (currentGaf === null) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <WorkspaceInfoValue
        label="Loaded from file"
        isLast
      >
        <WorkspaceInfoSourceFile currentGaf={currentGaf} />
      </WorkspaceInfoValue>
    </div>
  );
}
