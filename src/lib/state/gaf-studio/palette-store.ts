import { CurrentPaletteFromRaw } from "@/lib/state/gaf-studio/current-palette";

export type PaletteStore = {
  readonly grayscale: CurrentPaletteFromRaw;
  readonly grayscaleReverse: CurrentPaletteFromRaw;

  // TODO list other pre-selectable palettes
  // TODO etc
};
