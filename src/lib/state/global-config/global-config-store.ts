import { GlobalConfig, ListMode } from "@/lib/state/global-config/global-config";
import { create } from "zustand";

export type GlobalConfigStore = GlobalConfig & {
  readonly actions: {
    readonly setFrameListMode: (frameListMode: ListMode) => void;
    readonly setSubframeListMode: (subframeListMode: ListMode) => void;
  };
};

// TODO persist to localStorage

export const useGlobalConfigStore = create<GlobalConfigStore>()((set) => ({
  frameListMode: 'thumbs',
  subframeListMode: 'thumbs',

  actions: {
    setFrameListMode: (frameListMode) => set({ frameListMode }),
    setSubframeListMode: (subframeListMode) => set({ subframeListMode }),
  },
}));
