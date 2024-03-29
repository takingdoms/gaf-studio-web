import { GafWorkspaceState } from "@/lib/state/workspace/gaf/gaf-workspace-state";
import { TafPairWorkspaceState } from "@/lib/state/workspace/taf-pair/taf-pair";
import { TafSoloWorkspaceState } from "@/lib/state/workspace/taf-solo/taf-solo";
import { WorkspaceState } from "@/lib/state/workspace/workspace-state";
import React from "react";
import { StoreApi, useStore } from "zustand";

export type WorkspaceStoreWrapper = {
  format: 'gaf';
  store: StoreApi<GafWorkspaceState>;
} | {
  format: 'taf-solo';
  store: StoreApi<TafSoloWorkspaceState>;
} | {
  format: 'taf-pair';
  store: StoreApi<TafPairWorkspaceState>;
};

export const WorkspaceWrapperContext = React.createContext<WorkspaceStoreWrapper | null>(null);

/*
 * Components should never use these hooks directly because it exposes all actions/state values.
 * Instead they should use the store helper (S) which exposes only safe actions and getters.
 * The reason some actions might be unsafe is because they allow you to modify some parts of the
 * state while skipping the TAF synchronization logic. In practice, this is safe to use for GAFs,
 * but it's still better to avoid doing that even on GAFs for consistency.
 * The only place where this variable is "allowed" to be used is in the store helper (S) itself.
*/

export function useWorkspaceContextUnsafe<T>(selector: (state: WorkspaceState) => T): T {
  const wrapper = React.useContext(WorkspaceWrapperContext);
  if (!wrapper) throw new Error('Missing WorkspaceWrapperContext.Provider in the tree');
  return useStore(wrapper.store, selector);
}

export function useGafWorkspaceContextUnsafe<T>(selector: (state: GafWorkspaceState) => T): T {
  const wrapper = React.useContext(WorkspaceWrapperContext);
  if (!wrapper) throw new Error('Missing WorkspaceWrapperContext.Provider in the tree');
  if (wrapper.format !== 'gaf') throw new Error(`Not a Gaf workspace.`);
  return useStore(wrapper.store, selector);
}

export function useTafSoloWorkspaceContextUnsafe<T>(selector: (state: TafSoloWorkspaceState) => T): T {
  const wrapper = React.useContext(WorkspaceWrapperContext);
  if (!wrapper) throw new Error('Missing WorkspaceWrapperContext.Provider in the tree');
  if (wrapper.format !== 'taf-solo') throw new Error(`Not a Gaf workspace.`);
  return useStore(wrapper.store, selector);
}

export function useTafPairWorkspaceContextUnsafe<T>(selector: (state: TafPairWorkspaceState) => T): T {
  const wrapper = React.useContext(WorkspaceWrapperContext);
  if (!wrapper) throw new Error('Missing WorkspaceWrapperContext.Provider in the tree');
  if (wrapper.format !== 'taf-pair') throw new Error(`Not a Gaf workspace.`);
  return useStore(wrapper.store, selector);
}
