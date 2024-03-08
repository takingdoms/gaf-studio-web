import { AppDebugContext } from "@/components/AppDebugContext";
import BetaWorkspaceRoot from "@/components/app/beta/BetaWorkspaceRoot";
import { PaletteStoreContext } from "@/components/app/logical/PaletteStoreContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import { createGafWorkspaceStore } from "@/lib/state/store/gaf-workspace-store";
import { createTafWorkspaceStore } from "@/lib/state/store/taf-workspace-store";
import { WorkspaceStoreInitialState } from "@/lib/state/store/workspace-store";
import { WorkspaceStoreWrapper, WorkspaceStoreWrapperContext } from "@/lib/state/store/workspace-store-wrapper-context";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import React from "react";
import AppLayout from "./app/layout/AppLayout";

export default function App() {
  const [storeWrapper, setStoreWrapper] = React.useState<WorkspaceStoreWrapper>();

  const paletteStore = React.useMemo(() => {
    return createTakPaletteStore();
  }, []);

  const onInit = React.useCallback((initialState: WorkspaceStoreInitialState) => {
    if (initialState.format === 'gaf') {
      setStoreWrapper({
        format: 'gaf',
        store: createGafWorkspaceStore(initialState),
      });
    }
    else {
      setStoreWrapper({
        format: 'taf',
        store: createTafWorkspaceStore(initialState),
      });
    }
  }, []);

  if (storeWrapper === undefined) {
    return (
      <PaletteStoreContext.Provider value={paletteStore}>
        <PreludeScreen onInit={onInit} />
      </PaletteStoreContext.Provider>
    );
  }

  return (
    <AppDebugContext.Provider value={{
      resetWorkspace: () => setStoreWrapper(undefined),
    }}>
      <PaletteStoreContext.Provider value={paletteStore}>
        <WorkspaceStoreWrapperContext.Provider value={storeWrapper}>
          <AppLayout>
            <BetaWorkspaceRoot />
          </AppLayout>
        </WorkspaceStoreWrapperContext.Provider>
      </PaletteStoreContext.Provider>
    </AppDebugContext.Provider>
  );
}
