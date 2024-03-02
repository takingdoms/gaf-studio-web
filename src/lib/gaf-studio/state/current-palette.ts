import { ActualImage } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";

type BaseCurrentPalette<TKind extends string> = {
  kind: TKind;
  palette: Palette;
  previewImage: ActualImage;
};

export type CurrentPalette =
  | CurrentPaletteFromRaw
  | CurrentPaletteFromWorld
  | CurrentPaletteFromCustomFile;

export type CurrentPaletteFromRaw = BaseCurrentPalette<'raw'> & {
  palette: Palette;
};

export type CurrentPaletteFromWorld = BaseCurrentPalette<'world'> & {
  palette: Palette;
  world: string; // TODO custom type for the world
};

export type CurrentPaletteFromCustomFile = BaseCurrentPalette<'custom-file'> & {
  palette: Palette;
  originFile: File;
};
