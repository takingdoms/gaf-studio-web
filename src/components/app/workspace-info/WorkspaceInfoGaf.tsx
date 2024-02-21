import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace";

type WorkspaceInfoGafProps = {
  workspace: WorkspaceGaf;
};

export default function WorkspaceInfoGaf({ workspace }: WorkspaceInfoGafProps) {
  const currentGaf = workspace.getCurrentGaf();

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
