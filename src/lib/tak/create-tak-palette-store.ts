import { CurrentPaletteFromRaw } from "@/lib/gaf-studio/state/current-palette";
import { PaletteStore } from "@/lib/gaf-studio/state/palette-store";
import { ImageCompiler } from "@/lib/image/image-compiler";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import { SimpleImageCompiler } from "@/lib/image/simple-image-compiler";

export function createTakPaletteStore(): PaletteStore {
  const simpleImageCompiler = new SimpleImageCompiler();

  const grayscalePalette = makeGrayscalePalette(false);
  const grayscaleReversePalette = makeGrayscalePalette(true);

  const grayscale = makeRawPalette(
    'Black-to-white',
    grayscalePalette,
    simpleImageCompiler,
  );

  const grayscaleReverse = makeRawPalette(
    'White-to-black',
    grayscaleReversePalette,
    simpleImageCompiler,
  );

  return {
    grayscale,
    grayscaleReverse,
  };
}

function makeGrayscalePalette(reverse: boolean): Palette {
  const rgbData = new Uint8Array(256 * 3);

  for (let i = 0; i < 256; i++) {
    const value = reverse
      ? 255 - i
      : i;

    rgbData[i * 3 + 0] = value;
    rgbData[i * 3 + 1] = value;
    rgbData[i * 3 + 2] = value;
  }

  return { rgbData };
}

function makeRawPalette(
  name: string,
  palette: Palette,
  imageCompiler: ImageCompiler,
): CurrentPaletteFromRaw {
  return {
    kind: 'raw',
    palette,
    previewImage: PaletteUtils.compilePreviewImage(palette, imageCompiler),
    customName: name,
  };
}
