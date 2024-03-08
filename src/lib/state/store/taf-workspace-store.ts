import { BaseWorkspaceStoreInitialState, BaseWorkspaceStoreState, makeBaseWorkspaceStoreStateCreator } from "@/lib/state/store/base-workspace-store";
import { create } from "zustand";

export type TafWorkspaceStoreState = BaseWorkspaceStoreState<'taf'> & {
  readonly colorData: number[];

  readonly addColorData: (colorData: number[]) => void;
};

/*export const useTafWorkspaceStore = create<TafWorkspaceStoreState>()((set, get, store) => ({
  ...makeBaseWorkspaceStoreStateCreator('taf')(set, get, store),
  colorData: [],
  setColorData: (colorData) => {
    set({ colorData });
  },
}));*/

type InitialState = BaseWorkspaceStoreInitialState<'taf'> & {
  colorData: number[];
};

const creator = (initial: InitialState) => create<TafWorkspaceStoreState>()((set, get, store) => ({
  ...makeBaseWorkspaceStoreStateCreator('taf')(set, get, store),
  colorData: initial.colorData,
  addColorData: (colorData) => {
    set({
      colorData: [...get().colorData, ...colorData],
    });
  },
}));

export { creator as createTafWorkspaceStore };
export type { InitialState as TafWorkspaceStoreInitialState };
