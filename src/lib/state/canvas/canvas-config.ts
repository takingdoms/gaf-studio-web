import { MainCanvasLayer } from "@/lib/state/canvas/main-canvas-layer";
import { ReadonlyRecord } from "@/lib/utils/utility-types";

export type CanvasConfig = {
  readonly background: string;
  readonly importBackground: string;
  readonly mainCanvasLayerOrder: ReadonlySet<MainCanvasLayer>;
  readonly mainCanvasLayerVisibility: ReadonlyRecord<MainCanvasLayer, boolean>;
  readonly gridSpacing: number;
  readonly gridStyle: string;
  readonly crossStyle: string;
  readonly boundsStyle: string;
  readonly originBoundsStyle: string;
};
