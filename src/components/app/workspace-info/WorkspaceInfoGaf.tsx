import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceStateGaf } from "@/lib/gaf-studio/state/workspace-state";
import { DeepReadonly } from "ts-essentials";

type WorkspaceInfoGafProps = {
  workspaceState: DeepReadonly<WorkspaceStateGaf>;
};

export default function WorkspaceInfoGaf({ workspaceState }: WorkspaceInfoGafProps) {
  const { currentGaf } = workspaceState;

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
