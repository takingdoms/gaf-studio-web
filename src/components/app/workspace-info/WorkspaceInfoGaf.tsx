import WorkspaceInfoPalette from "@/components/app/workspace-info/WorkspaceInfoPalette";
import WorkspaceInfoSourceFile from "@/components/app/workspace-info/WorkspaceInfoSourceFile";
import WorkspaceInfoValue from "@/components/app/workspace-info/WorkspaceInfoValue";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";

type WorkspaceInfoGafProps = {
  workspace: WorkspaceGaf;
};

export default function WorkspaceInfoGaf({ workspace }: WorkspaceInfoGafProps) {
  const currentGaf = workspace.getCurrentGaf();
  const currentPal = workspace.state.currentPalette;

  return (
    <div className="flex flex-col">
      <WorkspaceInfoValue label="Loaded from file">
        <WorkspaceInfoSourceFile currentGaf={currentGaf} />
      </WorkspaceInfoValue>
      <WorkspaceInfoValue label="Color Palette" isLast>
        <WorkspaceInfoPalette currentPalette={currentPal} />
      </WorkspaceInfoValue>
    </div>
  );
}
