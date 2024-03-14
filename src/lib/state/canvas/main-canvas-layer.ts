import { ElementOf } from "ts-essentials";

export const MAIN_CANVAS_LAYERS = [
  'GRID',
  'IMAGE',
  'CROSS',
  'BOUNDS',
  'O_BOUNDS',
] as const satisfies string[];

export type MainCanvasLayer = ElementOf<typeof MAIN_CANVAS_LAYERS>;
