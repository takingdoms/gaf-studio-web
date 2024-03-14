import { MainCanvasLayer } from "@/lib/state/canvas/main-canvas-layer";

export type CanvasConfig = {
  readonly background: string;
  readonly mainCanvasLayerOrder: ReadonlySet<MainCanvasLayer>;
  readonly gridSpacing: number;
  readonly gridStyle: string;
  readonly crossStyle: string;
  readonly boundsStyle: string;
  readonly originBoundsStyle: string;
};
