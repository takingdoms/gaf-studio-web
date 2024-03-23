import { GlobalConfig, ListMode } from "@/lib/state/global-config/global-config";
import { create } from "zustand";

export type GlobalConfigStore = GlobalConfig & {
  readonly actions: {
    readonly setFrameListMode: (frameListMode: ListMode) => void;
    readonly setSubframeListMode: (subframeListMode: ListMode) => void;
    readonly setImporterWorkspaceOptionsCollapsed: (collapsed: boolean) => void;
    readonly setShowMultiFrameFrameData: (showMultiFrameFrameData: boolean) => void;
  };
};

// TODO persist to localStorage

export const useGlobalConfigStore = create<GlobalConfigStore>()((set) => ({
  frameListMode: 'thumbs',
  subframeListMode: 'thumbs',
  importerWorkspaceOptionsCollapsed: false,
  showMultiFrameFrameData: false,

  actions: {
    setFrameListMode: (frameListMode) => set({ frameListMode }),
    setSubframeListMode: (subframeListMode) => set({ subframeListMode }),
    setImporterWorkspaceOptionsCollapsed: (importerWorkspaceOptionsCollapsed) =>
      set({ importerWorkspaceOptionsCollapsed }),
    setShowMultiFrameFrameData: (showMultiFrameFrameData) => set({ showMultiFrameFrameData }),
  },
}));
