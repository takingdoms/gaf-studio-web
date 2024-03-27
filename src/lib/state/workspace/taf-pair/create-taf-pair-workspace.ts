import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { TafPairWorkspaceState } from "@/lib/state/workspace/taf-pair/taf-pair";
import { StoreApi, createStore } from "zustand";

export type TafPairWorkspaceConfig = {
  readonly initialGaf1555: CurrentGaf;
  readonly initialGaf4444: CurrentGaf;
};

type CreateTafPairWorkspace = (config: TafPairWorkspaceConfig) => StoreApi<TafPairWorkspaceState>;

export const createTafPairWorkspace: CreateTafPairWorkspace = (config) => createStore((set, get, store) => {
  return {
    format: 'taf',
    mode: 'pair',
    activeSubFormat: 'taf_1555',
    currentTaf1555: config.initialGaf1555,
    currentTaf4444: config.initialGaf4444,
    cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },

    abstractActions: {
      getCurrentGaf: () => {
        const state = get();
        return state.activeSubFormat === 'taf_1555'
          ? state.currentTaf1555
          : state.currentTaf4444;
      },
      setCurrentGaf: (newCurrentGaf) => {
        const state = get();
        if (state.activeSubFormat === 'taf_1555') {
          set({ currentTaf1555: newCurrentGaf });
        } else {
          set({ currentTaf4444: newCurrentGaf });
        }
      },
    },

    commonActions: {
      setCursor: (newCursor) => set({ cursor: newCursor }),


      getEntries: () => {
        throw 'TODO';
      },

      setEntries: (newEntries) => {
        throw 'TODO';
      },

      replaceEntry: (entryIndex, newEntry) => {
        throw 'TODO';
      },

      replaceFrame: (entryIndex, frameIndex, newFrame) => {
        throw 'TODO';
      },
    },

    tafPairOnlyActions: {
      setActiveSubFormat: (newActiveSubFormat) => set({ activeSubFormat: newActiveSubFormat }),
    },
  };
});
