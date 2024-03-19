import { PalettedImageResource } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";
import { ImageImporter, ImporterResult } from "@/lib/importing/image-importer";
import { PNG_GAF_IMAGE_IMPORTER, PngGafImageImporter } from "@/lib/importing/image-importers/gaf/png-gaf-image-importer";

export type GafImporterConfig = {
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
  TSubKind extends string,
  TSubConfig extends GafImporterConfig = GafImporterConfig,
> = ImageImporter<
  'gaf',
  TSubConfig,
  GafImporterResult
> & {
  readonly subKind: TSubKind;
  readonly makeDefaultConfig: (baseConfig: GafImporterConfig) => TSubConfig;
};

// TODO maybe rename to GafImageImporter
export type GafImageImporters =
  | PngGafImageImporter;

export const GAF_IMAGE_IMPORTERS: ReadonlyArray<GafImageImporters> = [
  PNG_GAF_IMAGE_IMPORTER,
];
