import { CANVAS_BG_OPTIONS } from "@/lib/state/canvas/canvas-bg-options";
import { CanvasConfig } from "@/lib/state/canvas/canvas-config";
import { create } from "zustand";

export type CanvasConfigStore = CanvasConfig & {
  readonly actions: {
    readonly setBackground: (bg: string) => void;
    readonly setGridOnTop: (showGridOnTop: boolean) => void;
    readonly setFrameBoundary: (frameBoundary: 'below' | 'above' | null) => void;
    readonly setFrameBoundaryBorderStyleSingle: (frameBoundaryBorderStyleSingle: string) => void;
    readonly setFrameBoundaryBorderStyleMulti: (frameBoundaryBorderStyleMulti: string) => void;
  };
};

// TODO persist to localStorage

export const useCanvasConfigStore = create<CanvasConfigStore>()((set) => ({
  background: CANVAS_BG_OPTIONS[4],
  showGridOnTop: false,
  frameBoundary: 'below',
  frameBoundaryBorderStyleSingle: '1px solid blue',
  frameBoundaryBorderStyleMulti: '1px solid red',

  actions: {
    setBackground: (background) => set({ background }),
    setGridOnTop: (showGridOnTop) => set({ showGridOnTop }),
    setFrameBoundary: (frameBoundary) => set({ frameBoundary }),
    setFrameBoundaryBorderStyleSingle: (frameBoundaryBorderStyleSingle) =>
      set({ frameBoundaryBorderStyleSingle }),
    setFrameBoundaryBorderStyleMulti: (frameBoundaryBorderStyleMulti) =>
      set({ frameBoundaryBorderStyleMulti }),
  },
}));
