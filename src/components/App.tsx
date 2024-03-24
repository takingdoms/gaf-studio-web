import { AppDebugContext } from "@/components/AppDebugContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import { WorkspaceStoreWrapper, WorkspaceStoreWrapperContext } from "@/lib/react/workspace-store-context";
import { WorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { createBoundGafStore, createBoundTafStore } from "@/lib/state/store/workspace-slices";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import React from "react";
import AppLayout from "./app/layout/AppLayout";
import AdHocWizardsContextProvider from "@/components/app/logical/AdHocWizardsContextProvider";
import { PaletteStoreContext } from "@/components/app/logical/PaletteStoreContext";
import ModalContextProvider from "@/components/ui/modal/ModalContextProvider";

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
      <ModalContextProvider>
        <PaletteStoreContext.Provider value={paletteStore}>
          <PreludeScreen onInit={onInit} />
        </PaletteStoreContext.Provider>
      </ModalContextProvider>
    );
  }

  return (
    <AppDebugContext.Provider value={{
      resetWorkspace: () => setStoreWrapper(undefined),
    }}>
      <WorkspaceStoreWrapperContext.Provider value={storeWrapper}>
        <ModalContextProvider>
          <AdHocWizardsContextProvider>
            <PaletteStoreContext.Provider value={paletteStore}>
              <AppLayout>
                <WorkspaceRoot />
              </AppLayout>
            </PaletteStoreContext.Provider>
          </AdHocWizardsContextProvider>
        </ModalContextProvider>
      </WorkspaceStoreWrapperContext.Provider>
    </AppDebugContext.Provider>
  );
}
