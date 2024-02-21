import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace";

type WorkspaceInfoTafProps = {
  workspace: WorkspaceTaf;
};

export default function WorkspaceInfoTaf({ workspace }: WorkspaceInfoTafProps) {
  const currentGaf = workspace.getCurrentGaf();

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
