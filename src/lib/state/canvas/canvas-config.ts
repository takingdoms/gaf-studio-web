import { MainCanvasLayer } from "@/lib/state/canvas/main-canvas-layer";

export type CanvasConfig = {
  readonly background: string;
  readonly mainCanvasLayerOrder: ReadonlySet<MainCanvasLayer>;
};
