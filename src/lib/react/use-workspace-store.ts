import { AnyWorkspaceStore, GafWorkspaceStore, TafWorkspaceStore, WorkspaceStoreWrapperContext } from "@/lib/react/workspace-store-context";
import React from "react";

export function useWorkspaceStore<T extends 'gaf'>(format: T): GafWorkspaceStore | null;
export function useWorkspaceStore<T extends 'taf'>(format: T): TafWorkspaceStore | null;
export function useWorkspaceStore(format?: undefined): AnyWorkspaceStore;
export function useWorkspaceStore<T extends 'gaf' | 'taf'>(format?: T): AnyWorkspaceStore | null {
  const storeWrapper = React.useContext(WorkspaceStoreWrapperContext);

  if (storeWrapper === null) {
    throw new Error(`Store has not yet been created.`);
  }

  if (format !== undefined && format !== storeWrapper.format) {
    return null;
  }

  return storeWrapper.store;
}
