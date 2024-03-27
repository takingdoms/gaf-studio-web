import { AppDebugContext } from "@/components/AppDebugContext";
import AdHocWizardsContextProvider from "@/components/app/logical/AdHocWizardsContextProvider";
import { PaletteStoreContext } from "@/components/app/logical/PaletteStoreContext";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import ModalContextProvider from "@/components/ui/modal/ModalContextProvider";
import { createGafWorkspace } from "@/lib/state/workspace/gaf/create-gaf-workspace";
import { createTafSoloWorkspace } from "@/lib/state/workspace/taf-solo/create-taf-solo-workspace";
import { WorkspaceStoreWrapper, WorkspaceWrapperContext } from "@/lib/state/workspace/workspace-context/workspace-context";
import { WorkspaceConfigWrapper } from "@/lib/state/workspace/workspace-state";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import React from "react";
import AppLayout from "./app/layout/AppLayout";

export default function App() {
  const [storeWrapper, setStoreWrapper] = React.useState<WorkspaceStoreWrapper>();

  const paletteStore = React.useMemo(() => {
    return createTakPaletteStore();
  }, []);

  const onInit = React.useCallback((configWrapper: WorkspaceConfigWrapper) => {
    if (configWrapper.format === 'gaf') {
      setStoreWrapper({
        format: 'gaf',
        store: createGafWorkspace(configWrapper.config),
      });
    }
    else if (configWrapper.format === 'taf-solo') {
      setStoreWrapper({
        format: 'taf-solo',
        store: createTafSoloWorkspace(configWrapper.config),
      });
    }
    else {
      throw new Error(`Format not yet supported.`);
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
      <WorkspaceWrapperContext.Provider value={storeWrapper}>
        <ModalContextProvider>
          <AdHocWizardsContextProvider>
            <PaletteStoreContext.Provider value={paletteStore}>
              <AppLayout>
                <WorkspaceRoot />
              </AppLayout>
            </PaletteStoreContext.Provider>
          </AdHocWizardsContextProvider>
        </ModalContextProvider>
      </WorkspaceWrapperContext.Provider>
    </AppDebugContext.Provider>
  );
}
