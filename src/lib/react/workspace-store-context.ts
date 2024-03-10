import { GafWorkspaceSlice, SharedWorkspaceSlice, TafWorkspaceSlice } from "@/lib/state/store/workspace-slices";
import React from "react";
import { StoreApi, UseBoundStore } from "zustand";

type BoundStoreApi<T> = UseBoundStore<StoreApi<T>>;

export type GafWorkspaceStore = BoundStoreApi<GafWorkspaceSlice & SharedWorkspaceSlice<'gaf'>>;

export type TafWorkspaceStore = BoundStoreApi<TafWorkspaceSlice & SharedWorkspaceSlice<'taf'>>;

export type AnyWorkspaceStore = BoundStoreApi<
  | (GafWorkspaceSlice & SharedWorkspaceSlice<'gaf'>)
  | (TafWorkspaceSlice & SharedWorkspaceSlice<'taf'>)
>;

export type WorkspaceStoreWrapper = {
  format: 'gaf';
  store: GafWorkspaceStore;
} | {
  format: 'taf';
  store: TafWorkspaceStore;
};

export const WorkspaceStoreWrapperContext = React.createContext<WorkspaceStoreWrapper | null>(null);
