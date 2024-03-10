import { AppDebugContext } from "@/components/AppDebugContext";
import { PaletteStoreContext } from "@/components/app/logical/PaletteStoreContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import { WorkspaceStoreWrapper, WorkspaceStoreWrapperContext } from "@/lib/react/workspace-store-context";
import { WorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import React from "react";
import AppLayout from "./app/layout/AppLayout";
import { createBoundGafStore, createBoundTafStore } from "@/lib/state/store/workspace-slices";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";

export default function App() {
  const [storeWrapper, setStoreWrapper] = React.useState<WorkspaceStoreWrapper>();

  const paletteStore = React.useMemo(() => {
    return createTakPaletteStore();
  }, []);

  const onInit = React.useCallback((config: WorkspaceSliceConfig) => {
    if (config.format === 'gaf') {
      setStoreWrapper({
        format: 'gaf',
        store: createBoundGafStore(config),
      });
    }
    else {
      setStoreWrapper({
        format: 'taf',
        store: createBoundTafStore(config),
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
            <WorkspaceRoot />
          </AppLayout>
        </WorkspaceStoreWrapperContext.Provider>
      </PaletteStoreContext.Provider>
    </AppDebugContext.Provider>
  );
}
