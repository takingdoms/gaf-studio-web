import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceStateTaf } from "@/lib/gaf-studio/state/workspace-state";
import { DeepReadonly } from "ts-essentials";

type WorkspaceInfoTafProps = {
  workspaceState: DeepReadonly<WorkspaceStateTaf>;
};

export default function WorkspaceInfoTaf({ workspaceState }: WorkspaceInfoTafProps) {
  const currentGaf = workspaceState.activeSubFormat === null
    ? null
    : workspaceState.currentGafs[workspaceState.activeSubFormat];

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
