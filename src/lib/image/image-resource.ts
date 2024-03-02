export type ActualImage = string; // base64urlencoded // TODO different type probably

export type PalettedImageResource = {
  kind: 'paletted';
  userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
  paletteIndices: Uint8Array; // what indices the compiledImage uses in the palette
  // always-cached for when there is no palette selected (doesn't change when the palette changes)
  // (compiledImage === noPaletteImage) is always true when there's no palette selected
  noPaletteImage: ActualImage;
  // whenever the context's palette changes, the compiledImage needs to be recompiled... unless
  // the new context's palette's key is the same as the value below. in order words, this property
  // is used to check if the compiledImage needs to be recompiled against the current palette
  // Nah what's the point of this again? Just recompile the compiledImage whenever the palette
  // changes
  // paletteKey: symbol | null;
};

export type ColoredImageResource = {
  kind: 'colored';
  userImage?: ActualImage;    // as submitted by the user (none when loaded from existing gaf/taf)
  compiledImage: ActualImage; // after the lossy conversion for the gaf/taf
};

export type ImageResource = PalettedImageResource | ColoredImageResource;
