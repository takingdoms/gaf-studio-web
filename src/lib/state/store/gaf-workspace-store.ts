import { BaseWorkspaceStoreInitialState, BaseWorkspaceStoreState, makeBaseWorkspaceStoreStateCreator } from "@/lib/state/store/base-workspace-store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GafWorkspaceStoreState = BaseWorkspaceStoreState<'gaf'> & {
  readonly palette: string;

  readonly setPalette: (palette: string) => void;
};

type InitialState = BaseWorkspaceStoreInitialState<'gaf'> & {
  palette: string;
};

const creator = (initial: InitialState) => create<GafWorkspaceStoreState>()(devtools((set, get, store) => ({
  ...makeBaseWorkspaceStoreStateCreator('gaf')(set, get, store),
  palette: initial.palette,
  setPalette: (palette) => {
    set({ palette });
  },
})));

export { creator as createGafWorkspaceStore };
export type { InitialState as GafWorkspaceStoreInitialState };
