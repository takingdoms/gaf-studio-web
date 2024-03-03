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
  // TODO find out why I didn't put colorData (LibGaf.ColorData) here or in VirtualGafLayerDataRawColors
};

export type ImageResource = PalettedImageResource | ColoredImageResource;
