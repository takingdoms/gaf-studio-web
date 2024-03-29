import { CurrentPalette, CurrentPaletteFromRaw } from "@/lib/state/gaf-studio/current-palette";

export type PaletteStore<K extends string = string> = {
  readonly default: CurrentPaletteFromRaw;
  readonly preSelectables: readonly PaletteStorePreSelectable<K>[];
  readonly loadPreSelectable: (key: K) => Promise<CurrentPalette>;
};

export type PaletteStorePreSelectable<K extends string = string> = {
  readonly key: K;
  readonly label: string;
};
