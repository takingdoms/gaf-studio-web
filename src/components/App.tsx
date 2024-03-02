import { AppDebugContext } from "@/components/AppDebugContext";
import { WorkspaceContext } from "@/components/app/logical/WorkspaceContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import { WorkspaceState } from "@/lib/gaf-studio/state/workspace-state";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import React from "react";
import AppLayout from "./app/layout/AppLayout";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import { PaletteStoreContext } from "@/components/app/logical/PaletteStoreContext";

export default function App() {
  const [workspaceState, setWorkspaceState] = React.useState<WorkspaceState>();

  const paletteStore = React.useMemo(() => {
    return createTakPaletteStore();
  }, []);

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
      <PaletteStoreContext.Provider value={paletteStore}>
        <PreludeScreen onInit={setWorkspaceState} />
      </PaletteStoreContext.Provider>
    );
  }

  return (
    <AppDebugContext.Provider value={{
      resetWorkspace: () => setWorkspaceState(undefined),
    }}>
      <PaletteStoreContext.Provider value={paletteStore}>
        <WorkspaceContext.Provider value={workspace}>
          <AppLayout>
            <WorkspaceRoot />
          </AppLayout>
        </WorkspaceContext.Provider>
      </PaletteStoreContext.Provider>
    </AppDebugContext.Provider>
  );
}
