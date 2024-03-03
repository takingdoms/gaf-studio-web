import LibGaf from "lib-gaf";

export type ActualImage = string; // base64urlencoded // TODO different type probably

export type PalettedImageResource = {
  kind: 'paletted';
  userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
  paletteIndices: Uint8Array; // what indices the compiledImage uses in the palette
};

export type ColoredImageResource = {
  kind: 'colored';
  userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
  colorData: LibGaf.ColorData<'argb1555' | 'argb4444'>; // source for the compiledImage
};

export type ImageResource = PalettedImageResource | ColoredImageResource;
