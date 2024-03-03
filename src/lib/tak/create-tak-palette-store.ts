import { CurrentPaletteFromRaw } from "@/lib/gaf-studio/state/current-palette";
import { PaletteStore } from "@/lib/gaf-studio/state/palette-store";
import { CanvasedImageCompiler } from "@/lib/image/canvased-image-compiler";
import { ImageCompiler } from "@/lib/image/image-compiler";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";

export function createTakPaletteStore(): PaletteStore {
  const canvasedImageCompiler = new CanvasedImageCompiler();

  const grayscalePalette = makeGrayscalePalette(false);
  const grayscaleReversePalette = makeGrayscalePalette(true);

  const grayscale = makeRawPalette(
    'Black-to-white',
    grayscalePalette,
    canvasedImageCompiler,
  );

  const grayscaleReverse = makeRawPalette(
    'White-to-black',
    grayscaleReversePalette,
    canvasedImageCompiler,
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
    previewImage: PaletteUtils.compilePreviewImage(16, 16, palette, imageCompiler),
    customName: name,
  };
}
