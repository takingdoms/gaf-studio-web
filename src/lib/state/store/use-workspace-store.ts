import { AnyWorkspaceStore, GafWorkspaceStore, TafWorkspaceStore, WorkspaceStoreWrapperContext } from "@/lib/state/store/workspace-store-wrapper-context";
import React from "react";

export function useWorkspaceStore(format: 'gaf'): GafWorkspaceStore | null;
export function useWorkspaceStore(format: 'taf'): TafWorkspaceStore | null;
export function useWorkspaceStore(format?: undefined): AnyWorkspaceStore;
export function useWorkspaceStore(format?: 'gaf' | 'taf'): AnyWorkspaceStore | null {
  const storeWrapper = React.useContext(WorkspaceStoreWrapperContext);

  if (storeWrapper === null) {
    throw new Error(`Store has not yet been created.`);
  }

  if (format !== undefined && format !== storeWrapper.format) {
    return null;
  }

  return storeWrapper.store;
}

function Example() {
  const anyStore = useWorkspaceStore();       // AnyWorkspaceStore
  const gafStore = useWorkspaceStore('gaf');  // GafWorkspaceStore | null
  const tafStore = useWorkspaceStore('taf');  // TafWorkspaceStore | null

  // anyStore is never null because this hook should only ever be used within a
  // WorkspaceStoreWrapperContext.Provider and when no arg is passed to the useWorkspaceStore
  // function then the currently loaded store is returned no matter the format.

  // gafStore is null if the currently loaded store is a TafWorkspaceStore
  // tafStore is null if the currently loaded store is a GafWorkspaceStore

  const cursor = useWorkspaceStore()((state) => state.cursor);
  const palette = useWorkspaceStore('gaf')?.((state) => state.palette);
  const colorData = useWorkspaceStore('taf')?.((state) => state.colorData);

  /*if (gafStore !== null) {
    return <ExampleGafComponent useGafStore={gafStore} />
  }*/
}

/*function ExampleGafComponent({ useGafStore }: { useGafStore: GafWorkspaceStore }) {
  const palette = useGafStore((state) => state.palette);

  return (
    <div>Foo</div>
  );
}*/
