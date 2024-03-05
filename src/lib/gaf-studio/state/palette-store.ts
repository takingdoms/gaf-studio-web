import { CurrentPalette, CurrentPaletteFromRaw } from "@/lib/gaf-studio/state/current-palette";

export type PaletteStore = {
  readonly grayscale: CurrentPaletteFromRaw;
  readonly grayscaleReverse: CurrentPaletteFromRaw;

  // TODO list other pre-selectable palettes
  // TODO etc
};
