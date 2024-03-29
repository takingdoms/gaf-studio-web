import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { _makeCommonWorkspace } from "@/lib/state/workspace/common/make-common-workspace";
import { TafPairWorkspaceState } from "@/lib/state/workspace/taf-pair/taf-pair";
import { StoreApi, createStore } from "zustand";

export type TafPairWorkspaceConfig = {
  readonly initialGaf: CurrentGaf<'taf-pair'>;
};

type CreateTafPairWorkspace = (config: TafPairWorkspaceConfig) => StoreApi<TafPairWorkspaceState>;

export const createTafPairWorkspace: CreateTafPairWorkspace = (config) => createStore((set, get, store) => {
  const common = _makeCommonWorkspace(set, get, store);

  return {
    format: 'taf-pair',
    gafFormat: 'taf',
    mode: 'pair',
    currentTaf: config.initialGaf,
    cursor: common.cursor,

    abstractActions: {
      getCurrentGaf: () => get().currentTaf,
      setCurrentGaf: (newCurrentGaf) => set({ currentTaf: newCurrentGaf }),
    },

    commonActions: {
      ...common.commonActions,
    },

    tafPairOnlyActions: {
      //
    },
  };
});
