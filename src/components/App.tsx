import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import React from "react";
import { DeepReadonly } from "ts-essentials";
import AppLayout from "./app/layout/AppLayout";
import { WorkspaceState } from "@/lib/gaf-studio/state/workspace-state";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import { AppDebugContext } from "@/components/AppDebugContext";

export default function App() {
  const [workspaceState, setWorkspaceState] = React.useState<DeepReadonly<WorkspaceState>>();

  const workspace = React.useMemo(() => {
    if (workspaceState === undefined) {
      return null;
    }

    return workspaceState.format === 'gaf'
      ? new WorkspaceGaf(workspaceState, setWorkspaceState)
      : new WorkspaceTaf(workspaceState, setWorkspaceState);
  }, [workspaceState]);

  if (workspaceState === undefined) {
    return (
      <PreludeScreen onInit={setWorkspaceState} />
    );
  }

  return (
    <AppDebugContext.Provider value={{
      resetWorkspace: () => setWorkspaceState(undefined),
    }}>
      <WorkspaceContext.Provider value={workspace}>
        <AppLayout>
          <WorkspaceRoot />
        </AppLayout>
      </WorkspaceContext.Provider>
    </AppDebugContext.Provider>
  );
}
