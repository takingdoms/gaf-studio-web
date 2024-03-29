import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { _makeCommonWorkspace } from "@/lib/state/workspace/common/make-common-workspace";
import { TafSoloWorkspaceState } from "@/lib/state/workspace/taf-solo/taf-solo";
import { StoreApi, createStore } from "zustand";

export type TafSoloWorkspaceConfig = {
  readonly initialGaf: CurrentGaf;
  readonly subFormat: TafSubFormat;
};

type CreateTafSoloWorkspace = (config: TafSoloWorkspaceConfig) => StoreApi<TafSoloWorkspaceState>;

export const createTafSoloWorkspace: CreateTafSoloWorkspace = (config) => createStore((set, get, store) => {
  const common = _makeCommonWorkspace(set, get, store);

  return {
    format: 'taf-solo',
    gafFormat: 'taf',
    mode: 'solo',
    currentTaf: config.initialGaf,
    subFormat: config.subFormat,
    cursor: common.cursor,

    abstractActions: {
      getCurrentGaf: () => get().currentTaf,
      setCurrentGaf: (newCurrentGaf) => set({ currentTaf: newCurrentGaf }),
    },

    commonActions: {
      ...common.commonActions,
    },

    tafSoloOnlyActions: {
      //
    },
  };
});
