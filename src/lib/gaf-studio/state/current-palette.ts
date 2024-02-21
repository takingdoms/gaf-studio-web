import { Palette } from "@/lib/image/palette/palette";

type BaseCurrentPalette<TKind extends string> = {
  kind: TKind;
  palette: Palette;
};

export type CurrentPalette =
  | CurrentPaletteFromRaw
  | CurrentPaletteFromWorld
  | CurrentPaletteFromCustomFile;

export type CurrentPaletteFromRaw = BaseCurrentPalette<'raw'>;

export type CurrentPaletteFromWorld = BaseCurrentPalette<'world'> & {
  world: string; // TODO custom type for the world
};

export type CurrentPaletteFromCustomFile = BaseCurrentPalette<'custom-file'> & {
  originFile: File;
};
