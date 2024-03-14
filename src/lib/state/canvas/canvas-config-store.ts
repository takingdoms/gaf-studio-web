import { CANVAS_BG_OPTIONS } from "@/lib/state/canvas/canvas-bg-options";
import { CanvasConfig } from "@/lib/state/canvas/canvas-config";
import { MainCanvasLayer } from "@/lib/state/canvas/main-canvas-layer";
import { create } from "zustand";

export type CanvasConfigStore = CanvasConfig & {
  readonly actions: {
    readonly setMainCanvasLayerOrder: (order: ReadonlySet<MainCanvasLayer>) => void;
  };
};

// TODO persist to localStorage

export const useCanvasConfigStore = create<CanvasConfigStore>()((set) => ({
  background: CANVAS_BG_OPTIONS[4],
  mainCanvasLayerOrder: new Set([
    'GRID',
    'IMAGE',
    'CROSS',
    'BOUNDS',
    'O_BOUNDS',
  ]),

  actions: {
    setMainCanvasLayerOrder: (mainCanvasLayerOrder) => set({ mainCanvasLayerOrder }),
  },
}));
