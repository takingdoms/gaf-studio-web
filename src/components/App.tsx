import { WorkspaceControllerContext } from "@/components/app/logical/WorkspaceControllerContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import { Workspace } from "@/lib/gaf-studio/state/workspace";
import { WorkspaceController } from "@/lib/gaf-studio/state/workspace-controller";
import React from "react";
import { DeepReadonly } from "ts-essentials";
import AppLayout from "./app/layout/AppLayout";

export default function App() {
  const [workspace, setWorkspace] = React.useState<DeepReadonly<Workspace>>();

  const workspaceController = React.useMemo(() => {
    if (workspace === undefined) {
      return null;
    }

    return new WorkspaceController(workspace, setWorkspace);
  }, [workspace]);

  if (workspace === undefined) {
    return (
      <PreludeScreen onInit={setWorkspace} />
    );
  }

  return (
    <WorkspaceControllerContext.Provider value={workspaceController}>
      <AppLayout>
        <WorkspaceRoot />
      </AppLayout>
    </WorkspaceControllerContext.Provider>
  );
}
