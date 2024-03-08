import { MainFormat } from "@/lib/main-format";
import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { StateCreator } from "zustand";

export type BaseWorkspaceStoreState<TFormat extends MainFormat> = {
  readonly format: TFormat;
  readonly cursor: WorkspaceCursor;

  readonly setCursor: (cursor: WorkspaceCursor) => void;
};

type MakeBaseWorkspaceStoreStateCreator =
  <TFormat extends MainFormat>(format: TFormat) =>
    StateCreator<BaseWorkspaceStoreState<TFormat>>;

const make: MakeBaseWorkspaceStoreStateCreator = (format) => (set) => ({
  format,
  cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },
  setCursor: (cursor) => {
    set({ cursor });
  },
});

export { make as makeBaseWorkspaceStoreStateCreator };

/*export const baseWorkspaceStore = create<BaseWorkspaceStoreState<'gaf'>>()
  (makeBaseWorkspaceStoreStateCreator('gaf'));*/

export type BaseWorkspaceStoreInitialState<T extends MainFormat> = {
  format: T;
};
