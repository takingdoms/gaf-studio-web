import { AppDebugContext } from "@/components/AppDebugContext";
import CommonProviders from "@/components/app/logical/CommonProviders";
import PreludeScreen from "@/components/app/prelude/PreludeScreen";
import WorkspaceRoot from "@/components/app/workspace-root/WorkspaceRoot";
import { WorkspaceStoreWrapper, WorkspaceStoreWrapperContext } from "@/lib/react/workspace-store-context";
import { WorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { createBoundGafStore, createBoundTafStore } from "@/lib/state/store/workspace-slices";
import { createTakPaletteStore } from "@/lib/tak/create-tak-palette-store";
import React from "react";
import AppLayout from "./app/layout/AppLayout";
import AdHocWizardsContextProvider from "@/components/app/logical/AdHocWizardsContextProvider";

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
      <CommonProviders paletteStore={paletteStore}>
        <PreludeScreen onInit={onInit} />
      </CommonProviders>
    );
  }

  return (
    <AppDebugContext.Provider value={{
      resetWorkspace: () => setStoreWrapper(undefined),
    }}>
      <WorkspaceStoreWrapperContext.Provider value={storeWrapper}>
        <CommonProviders paletteStore={paletteStore}>
          <AdHocWizardsContextProvider>
            <AppLayout>
              <WorkspaceRoot />
            </AppLayout>
          </AdHocWizardsContextProvider>
        </CommonProviders>
      </WorkspaceStoreWrapperContext.Provider>
    </AppDebugContext.Provider>
  );
}
