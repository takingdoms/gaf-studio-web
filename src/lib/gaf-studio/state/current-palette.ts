import { ActualImage } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";

type BaseCurrentPalette<TKind extends string> = {
  kind: TKind;
  palette: Palette;
  previewImage: {
    width: number;
    height: number;
    image: ActualImage;
  };
};

export type CurrentPalette =
  | CurrentPaletteFromRaw
  | CurrentPaletteFromWorld
  | CurrentPaletteFromCustomFile;

export type CurrentPaletteFromRaw = BaseCurrentPalette<'raw'> & {
  customName?: string;
};

export type CurrentPaletteFromWorld = BaseCurrentPalette<'world'> & {
  world: string; // TODO custom type for the world
  fileName: string;
};

export type CurrentPaletteFromCustomFile = BaseCurrentPalette<'custom-file'> & {
  originFile: File;
};
