import { AppDebugContext } from "@/components/AppDebugContext";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import { WorkspaceState } from "@/lib/gaf-studio/state/workspace-state";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import React from "react";
import AppLayout from "./app/layout/AppLayout";

export default function App() {
  const [workspaceState, setWorkspaceState] = React.useState<WorkspaceState>();

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
