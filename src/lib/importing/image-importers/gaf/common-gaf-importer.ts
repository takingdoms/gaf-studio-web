import { Debug } from "@/lib/debug/debug";
import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { PalettedImageResource } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import { ImageDecoder } from "@/lib/importing/image-decoder";
import { GafImageImporter, GafImporterConfig, GafImporterResult } from "@/lib/importing/image-importers/gaf/gaf-image-importer";
import { ColorRgb, ColorRgba } from "@/lib/utils/utility-types";

export type CommonGafImporterConfig = GafImporterConfig & {
  readonly transparencyStrategy: {
    // any pixel where alpha < 255 gets interpreted as a transparent pixel
    readonly kind: 'auto-alpha';
  } | {
    // any pixel that matches the provided color gets interpreted as a transparent pixel
    // the effect of the 'auto-alpha' strategy is also applied!
    readonly kind: 'custom-color';
    readonly color: ColorRgb | ColorRgba;
  };

  readonly transpIndexStrategy: {
    readonly kind: 'auto-assign';
  } | {
    readonly kind: 'fixed-index';
    readonly fixedIndex: number;
  };
};

const imageCompiler = new SimpleImageCompiler();

export function makeCommonGafImageImporter<TSubKind extends symbol>(
  options: {
    subKind: TSubKind;
    title: string;
    decoder: ImageDecoder;
  },
): GafImageImporter<TSubKind, CommonGafImporterConfig> {
  return {
    format: 'gaf',
    subKind: options.subKind,
    supportedFileExts: options.decoder.supportedFileExts,
    title: options.title,
    makeDefaultConfig: (baseConfig) => {
      return {
        palette: baseConfig.palette,
        transparencyStrategy: {
          kind: 'auto-alpha',
        },
        transpIndexStrategy: {
          kind: 'auto-assign',
        },
      };
    },
    createUserImage: options.decoder.decodeFile,
    createResource: async (decodedImage, config) => {
      const { width, height } = decodedImage.metadata;
      const { palette, transparencyStrategy, transpIndexStrategy } = config;
      const srcBytes = decodedImage.colorData.bytes;

      Debug.assertEq(width * height * 4, srcBytes.length);

      let lossyColorMatches = 0;
      let lossyAlphaMatches = 0;

      let fixedTransparencyIndex = transpIndexStrategy.kind === 'fixed-index'
        ? transpIndexStrategy.fixedIndex
        : undefined;

      const transparencyColor = transparencyStrategy.kind === 'custom-color'
        ? transparencyStrategy.color
        : undefined;

      const preIndices: Array<number | null> = []; // null = transparent

      // for: color indexing pass (finds an index in the palette for each source color)
      for (let i = 0; i < width * height; i++) {
        const srcRed = srcBytes[i * 4 + 0];
        const srcGre = srcBytes[i * 4 + 1];
        const srcBlu = srcBytes[i * 4 + 2];
        const srcAlp = srcBytes[i * 4 + 3];

        if (transparencyColor !== undefined) {
          const { r, g, b } = transparencyColor;
          const a = 'a' in transparencyColor ? transparencyColor.a : undefined;

          if (srcRed === r && srcGre === g && srcBlu === b && (a === undefined || srcAlp === a)) {
            preIndices[i] = null;
            continue;
          }
        }

        if (srcAlp !== 255) {
          if (srcAlp !== 0) {
            lossyAlphaMatches++;
          }

          preIndices[i] = null;
          continue;
        }

        const index = findColorOnPalette(srcRed, srcGre, srcBlu, palette, fixedTransparencyIndex);

        if (index !== false) {
          preIndices[i] = index;
          continue;
        }

        lossyColorMatches++;
        preIndices[i] = autoColorApproximator(srcRed, srcGre, srcBlu, palette, fixedTransparencyIndex);
      }

      const indices = new Uint8Array(width * height);
      Debug.assertEq(preIndices.length, indices.length);

      let transparencyIndex: number;

      if (transpIndexStrategy.kind === 'auto-assign') {
        const vacantTranspIndex = findVacantTransparencyIndex(preIndices);

        if (vacantTranspIndex === null) {
          // TODO purposefuly reach this error to see if it's possible (should be, probably)
          return {
            kind: 'error',
            error: 'Failed to auto-assign a transparency index. Please manually select an index from'
              + ' the palette (preferable) or reduce the number of colors used in the source image'
              + ' so that less than 255 unique colors are used.',
            resource: null,
          };
        }

        transparencyIndex = vacantTranspIndex;
      }
      else {
        transparencyIndex = transpIndexStrategy.fixedIndex;
      }

      // for: transparency pass (converts nulls into transparencyIndex)
      for (let i = 0; i < preIndices.length; i++) {
        const nextIndex = preIndices[i];
        indices[i] = nextIndex === null
          ? transparencyIndex
          : nextIndex;
      }

      const compiledData = PaletteUtils.createColorData(width, height, transparencyIndex, indices, palette);
      const compiledImage = imageCompiler.compileImage(width, height, compiledData);

      const resource: PalettedImageResource = {
        kind: 'paletted',
        userImage: decodedImage.image,
        compiledImage,
        paletteIndices: indices,
      };

      const result: GafImporterResult = {
        resource,
        lossyColorMatches,
        lossyAlphaMatches,
        transparencyIndex,
      };

      const warnings: string[] = [];

      if (lossyColorMatches > 0) {
        warnings.push(`Lossy conversion. Not every color in the source image exists in the selected`
          + ` palette file.`);
      }

      if (lossyAlphaMatches > 0) {
        warnings.push(`Lossy conversion. Not every pixel was fully transparent or fully opaque.`
          + ` In other words, some of the pixels had a semi-transparent color (which isn't supported`
          + ` by the GAF format).`);
      }

      if (warnings.length > 0) {
        return {
          kind: 'warning',
          warning: warnings.join('; '),
          result,
        };
      }

      return {
        kind: 'success',
        result,
      };
    },
  };
}

function findColorOnPalette(
  srcRed: number,
  srcGre: number,
  srcBlu: number,
  palette: Palette,
  transparencyIndex?: number,
): number | false {
  for (let i = 0; i < 256; i++) {
    if (i === transparencyIndex) {
      continue;
    }

    const palRed = palette.rgbData[i * 3 + 0];
    const palGre = palette.rgbData[i * 3 + 1];
    const palBlu = palette.rgbData[i * 3 + 2];

    if (srcRed === palRed && srcGre === palGre && srcBlu === palBlu) {
      return i;
    }
  }

  return false;
}

// null = failed to find color (usually impossible)
function autoColorApproximator(
  srcRed: number,
  srcGre: number,
  srcBlu: number,
  palette: Palette,
  transparencyIndex?: number,
): number | null {
  let closestIndex: number | null = transparencyIndex ?? null;
  let closestDistance = Infinity;

  for (let i = 0; i < 256; i++) {
    if (i === transparencyIndex) {
      continue;
    }

    const palRed = palette.rgbData[i * 3 + 0];
    const palGre = palette.rgbData[i * 3 + 1];
    const palBlu = palette.rgbData[i * 3 + 2];

    const distance = Math.sqrt(
      Math.pow(srcRed - palRed, 2) +
      Math.pow(srcGre - palGre, 2) +
      Math.pow(srcBlu - palBlu, 2)
    );

    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  }

  return closestIndex;
}

const DEFAULT_VACANT_TRANSPARENCY_INDEX: number | undefined = 9;

// null = failed to find a vacant transparencyIndex!!!
function findVacantTransparencyIndex(indices: Array<number | null>): number | null {
  const defaultIndex = DEFAULT_VACANT_TRANSPARENCY_INDEX;

  if (defaultIndex !== undefined && !indices.includes(defaultIndex)) {
    return defaultIndex;
  }

  for (let i = 0; i < 256; i++) {
    if (!indices.includes(i)) {
      return i;
    }
  }

  return null;
}
