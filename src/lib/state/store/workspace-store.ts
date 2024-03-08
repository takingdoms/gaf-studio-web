import { GafWorkspaceStoreInitialState, GafWorkspaceStoreState } from "@/lib/state/store/gaf-workspace-store";
import { TafWorkspaceStoreInitialState, TafWorkspaceStoreState } from "@/lib/state/store/taf-workspace-store";

export type WorkspaceStoreState =
  | GafWorkspaceStoreState
  | TafWorkspaceStoreState;

export type WorkspaceStoreInitialState =
  | GafWorkspaceStoreInitialState
  | TafWorkspaceStoreInitialState;
