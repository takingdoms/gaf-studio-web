import { CurrentPaletteFromRaw } from "@/lib/gaf-studio/state/current-palette";
import { PaletteStore } from "@/lib/gaf-studio/state/palette-store";
import { CanvasedImageCompiler } from "@/lib/image/canvased-image-compiler";
import { ImageCompiler } from "@/lib/image/image-compiler";

export function createTakPaletteStore(): PaletteStore {
  const canvasedImageCompiler = new CanvasedImageCompiler();

  const grayscaleBytes = makeGrayscaleBytes(false);
  const grayscaleReverseBytes = makeGrayscaleBytes(true);

  const grayscale = makeRawPalette(
    grayscaleBytes.rgb,
    grayscaleBytes.rgba,
    canvasedImageCompiler,
  );

  const grayscaleReverse = makeRawPalette(
    grayscaleReverseBytes.rgb,
    grayscaleReverseBytes.rgba,
    canvasedImageCompiler,
  );

  return {
    grayscale,
    grayscaleReverse,
  };
}

function makeGrayscaleBytes(reverse: boolean): { rgb: Uint8Array; rgba: Uint8Array } {
  const rgb = new Uint8Array(256 * 3);
  const rgba = new Uint8Array(256 * 4);

  for (let i = 0; i < 256; i++) {
    const value = reverse
      ? 255 - i
      : i;

    rgb[i * 3 + 0] = value;
    rgb[i * 3 + 1] = value;
    rgb[i * 3 + 2] = value;

    rgba[i * 4 + 0] = value;
    rgba[i * 4 + 1] = value;
    rgba[i * 4 + 2] = value;
    rgba[i * 4 + 3] = 255;
  }

  return {
    rgb,
    rgba,
  };
}

function makeRawPalette(
  bytesRgb: Uint8Array,
  bytesRgba: Uint8Array,
  imageCompiler: ImageCompiler,
): CurrentPaletteFromRaw {
  return {
    kind: 'raw',
    palette: { rgbData: bytesRgb },
    previewImage: imageCompiler.compileImage(
      16,
      16,
      { bytes: bytesRgba, format: 'rgba8888' },
    ),
  };
}
