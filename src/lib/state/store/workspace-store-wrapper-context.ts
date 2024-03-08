import { GafWorkspaceStoreState } from "@/lib/state/store/gaf-workspace-store";
import { TafWorkspaceStoreState } from "@/lib/state/store/taf-workspace-store";
import React from "react";
import { StoreApi, UseBoundStore } from "zustand";

export type GafWorkspaceStore = UseBoundStore<StoreApi<GafWorkspaceStoreState>>;
export type TafWorkspaceStore = UseBoundStore<StoreApi<TafWorkspaceStoreState>>;
export type AnyWorkspaceStore = UseBoundStore<StoreApi<GafWorkspaceStoreState | TafWorkspaceStoreState>>;

export type WorkspaceStoreWrapper = {
  format: 'gaf';
  store: GafWorkspaceStore;
} | {
  format: 'taf';
  store: TafWorkspaceStore;
};

export const WorkspaceStoreWrapperContext = React.createContext<WorkspaceStoreWrapper | null>(null);
