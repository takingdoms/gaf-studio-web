import { ReadonlyUint8Array } from "@/lib/utils/utility-types";
import LibGaf from "lib-gaf";

export type ActualImage = ImageData;

export type PalettedImageResource = {
  readonly kind: 'paletted';
  readonly userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  readonly compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
  readonly paletteIndices: ReadonlyUint8Array; // what indices the compiledImage uses in the palette
};

export type ColoredImageResource = {
  readonly kind: 'colored';
  readonly userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  readonly compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
  readonly colorData: LibGaf.ColorData<'argb1555' | 'argb4444'>; // source for the compiledImage
};

export type ImageResource = PalettedImageResource | ColoredImageResource;
