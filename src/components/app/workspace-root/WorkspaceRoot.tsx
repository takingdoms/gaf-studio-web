import WorkspaceInfo from "@/components/app/workspace-info/WorkspaceInfo";
import WorkspaceSwapTest from "@/components/app/workspace-root/WorkspaceSwapTest";

type WorkspaceRootProps = {};

export default function WorkspaceRoot({}: WorkspaceRootProps) {
  return (
    <div className="h-full overflow-auto">
      <WorkspaceInfo />
      <WorkspaceSwapTest />
    </div>
  );
}
