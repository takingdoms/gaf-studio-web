import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace";
import { DeepReadonly } from "ts-essentials";

type WorkspaceInfoGafProps = {
  workspaceGaf: DeepReadonly<WorkspaceGaf>;
};

export default function WorkspaceInfoGaf({ workspaceGaf }: WorkspaceInfoGafProps) {
  const { currentGaf } = workspaceGaf;

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
