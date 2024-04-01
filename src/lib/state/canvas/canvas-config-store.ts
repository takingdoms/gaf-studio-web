import { CANVAS_BG_OPTIONS } from "@/lib/state/canvas/canvas-bg-options";
import { CanvasConfig } from "@/lib/state/canvas/canvas-config";
import { MainCanvasLayer } from "@/lib/state/canvas/main-canvas-layer";
import { ReadonlyRecord } from "@/lib/utils/utility-types";
import { create } from "zustand";

export type CanvasConfigStore = CanvasConfig & {
  readonly actions: {
    readonly setBackground: (background: string) => void;
    readonly setMainCanvasLayerOrder: (o: ReadonlySet<MainCanvasLayer>) => void;
    readonly setMainCanvasLayerVisibility: (v: ReadonlyRecord<MainCanvasLayer, boolean>) => void;
    readonly setGridSpacing: (gridSpacing: number) => void;
    readonly setGridStyle: (gridStyle: string) => void;
    readonly setCrossStyle: (crossStyle: string) => void;
    readonly setBoundsStyle: (boundsStyle: string) => void;
    readonly setOriginBoundsStyle: (originBoundsStyle: string) => void;
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
  mainCanvasLayerVisibility: {
    'GRID': true,
    'IMAGE': true,
    'CROSS': true,
    'BOUNDS': true,
    'O_BOUNDS': true,
  },
  gridSpacing: 16,
  gridStyle: '#0000000A',
  crossStyle: '#FF0000FF',
  boundsStyle: '#FF00FFEE',
  originBoundsStyle: '#0000FFEE',

  actions: {
    setBackground: (background) => set({ background }),
    setMainCanvasLayerVisibility: (mainCanvasLayerVisibility) => set({ mainCanvasLayerVisibility }),
    setMainCanvasLayerOrder: (mainCanvasLayerOrder) => set({ mainCanvasLayerOrder }),
    setGridSpacing: (gridSpacing) => set({ gridSpacing }),
    setGridStyle: (gridStyle) => set({ gridStyle }),
    setCrossStyle: (crossStyle) => set({ crossStyle }),
    setBoundsStyle: (boundsStyle) => set({ boundsStyle }),
    setOriginBoundsStyle: (originBoundsStyle) => set({ originBoundsStyle }),
  },
}));
