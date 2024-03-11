import { CANVAS_BG_OPTIONS } from "@/lib/state/canvas/canvas-bg-options";
import { CanvasConfig } from "@/lib/state/canvas/canvas-config";
import { create } from "zustand";

export type CanvasConfigStore = CanvasConfig & {
  readonly actions: {
    readonly setBackground: (bg: string) => void;
    readonly setGridOnTop: (showGridOnTop: boolean) => void;
  };
};

// TODO persist to localStorage

export const useCanvasConfigStore = create<CanvasConfigStore>()((set) => ({
  background: CANVAS_BG_OPTIONS[4],
  showGridOnTop: false,

  actions: {
    setBackground: (background) => set({ background }),
    setGridOnTop: (showGridOnTop) => set({ showGridOnTop }),
  },
}));
