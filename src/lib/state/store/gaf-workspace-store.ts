import { BaseWorkspaceStoreInitialState, BaseWorkspaceStoreState, makeBaseWorkspaceStoreStateCreator } from "@/lib/state/store/base-workspace-store";
import { create } from "zustand";

export type GafWorkspaceStoreState = BaseWorkspaceStoreState<'gaf'> & {
  readonly palette: string;

  readonly setPalette: (palette: string) => void;
};

/*export const useGafWorkspaceStore = create<GafWorkspaceStoreState>()((set, get, store) => ({
  ...makeBaseWorkspaceStoreStateCreator('gaf')(set, get, store),
  palette: 'empty',
  setPalette: (palette) => {
    set({ palette });
  },
}));*/

type InitialState = BaseWorkspaceStoreInitialState<'gaf'> & {
  palette: string;
};

const creator = (initial: InitialState) => create<GafWorkspaceStoreState>()((set, get, store) => ({
  ...makeBaseWorkspaceStoreStateCreator('gaf')(set, get, store),
  palette: initial.palette,
  setPalette: (palette) => {
    set({ palette });
  },
}));

export { creator as createGafWorkspaceStore };
export type { InitialState as GafWorkspaceStoreInitialState };
