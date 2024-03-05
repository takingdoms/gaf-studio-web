import { ActualImage } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";

type BaseCurrentPalette<TKind extends string> = {
  readonly kind: TKind;
  readonly palette: Palette;
  readonly previewImage: {
    readonly width: number;
    readonly height: number;
    readonly image: ActualImage;
  };
};

export type CurrentPalette =
  | CurrentPaletteFromRaw
  | CurrentPaletteFromWorld
  | CurrentPaletteFromCustomFile;

export type CurrentPaletteFromRaw = BaseCurrentPalette<'raw'> & {
  readonly customName?: string;
};

export type CurrentPaletteFromWorld = BaseCurrentPalette<'world'> & {
  readonly world: string; // TODO custom type for the world
  readonly fileName: string;
};

export type CurrentPaletteFromCustomFile = BaseCurrentPalette<'custom-file'> & {
  readonly originFile: File;
};
