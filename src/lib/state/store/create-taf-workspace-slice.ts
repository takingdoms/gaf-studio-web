import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { TafWorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { TafWorkspaceSlice } from "@/lib/state/store/workspace-slices";
import { StateCreator } from "zustand";

type Creator = StateCreator<TafWorkspaceSlice, [], [], TafWorkspaceSlice>;
type CreatorMaker = (config: TafWorkspaceSliceConfig) => Creator;

export const createTafWorkspaceSliceWrapper: CreatorMaker = (config) => (set, get) => ({
  format: 'taf',

  cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },

  currentGafs: config.initialGafs,

  activeSubFormat: config.initialSubFormat,

  getCurrentGaf: () => {
    const activeSubFormat = get().activeSubFormat;
    return get().currentGafs[activeSubFormat]!;
  },

  setCurrentGaf: (newCurrentGaf) => {
    const activeSubFormat = get().activeSubFormat;
    set((state) => ({
      currentGafs: {
        ...state.currentGafs,
        [activeSubFormat]: newCurrentGaf,
      },
    }));
  },

  setActiveSubFormat: (newActiveSubFormat: TafSubFormat) => {
    const currentGafs = get().currentGafs;

    if (currentGafs[newActiveSubFormat] === null) {
      const newCurrentGaf: CurrentGaf = {
        kind: 'blank',
        compiledGaf: null,
        virtualGaf: {
          entries: [],
        },
      };

      set((state) => ({
        activeSubFormat: newActiveSubFormat,
        currentGafs: {
          ...state.currentGafs,
          [newActiveSubFormat]: newCurrentGaf,
        },
      }));

      return;
    }

    set({ activeSubFormat: newActiveSubFormat });
  },
});
