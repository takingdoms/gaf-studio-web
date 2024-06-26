import { PalettedImageResource } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";
import { ImageImporter, ImporterResult } from "@/lib/importing/image-importer";
import { BMP_GAF_IMAGE_IMPORTER, BmpGafImageImporter } from "@/lib/importing/image-importers/gaf/bmp-gaf-image-importer";
import { PNG_GAF_IMAGE_IMPORTER, PngGafImageImporter } from "@/lib/importing/image-importers/gaf/png-gaf-image-importer";
import { StrictOmit } from 'ts-essentials';

export type GafImporterConfig = {
  readonly compatibilityKey: symbol;
  readonly palette: Palette;
};

export type GafImporterResult = ImporterResult<PalettedImageResource> & {
  readonly transparencyIndex: number;

  /**
   * Number of pixels where the RGB color didn't perfectly match with a color in the palette.
   * 0 = perfect/lossless conversion
   */
  readonly lossyColorMatches: number;

  /**
   * Number of pixels where the alpha value was different than 0 and 255
   * 0 = every pixel's alpha was either fully transparent or fully opaque (which is desired)
   */
  readonly lossyAlphaMatches: number;
};

// TODO maybe rename to BaseGafImageImporter
export type GafImageImporter<
  TSubKind extends symbol,
  TSubConfig extends GafImporterConfig = GafImporterConfig,
> = ImageImporter<
  'gaf',
  TSubConfig,
  GafImporterResult
> & {
  readonly subKind: TSubKind;
  readonly makeDefaultConfig: (base: StrictOmit<GafImporterConfig, 'compatibilityKey'>) => TSubConfig;
};

// TODO maybe rename to GafImageImporter
export type GafImageImporters =
  | PngGafImageImporter
  | BmpGafImageImporter;

export const GAF_IMAGE_IMPORTERS: ReadonlyArray<GafImageImporters> = [
  PNG_GAF_IMAGE_IMPORTER,
  BMP_GAF_IMAGE_IMPORTER,
];
