import { ColoredImageResource } from "@/lib/image/image-resource";
import { DecodedUserImage } from "@/lib/importing/image-decoder";
import { ImporterResult, ImporterResultWrapper } from "@/lib/importing/image-importer";
import { makeCommonTafImageImporter } from "@/lib/importing/image-importers/taf/common-taf-importer";
import { NamedDepthConverter } from "@/lib/importing/image-importers/taf/named-depth-converter";
import { TafSubFormat, TafSubFormatToColorDataFormat } from "@/lib/main-format";

export type TafImporterResult<TColorDataFormat extends 'argb1555' | 'argb4444'> =
  ImporterResult<ColoredImageResource<TColorDataFormat>> &
{
  /**
   * Number of pixels where the RGB color didn't get converted losslessly.
   */
  readonly lossyPixelMatches: 'TODO';
};

export type TafImageImporterConfig<T extends TafSubFormat> = T extends 'taf_1555' ? {
  // convert8to1: LibGaf.ColorUtils.DepthConverter<8, 1>;
  // convert8to5: LibGaf.ColorUtils.DepthConverter<8, 5>;
  converter8to1: NamedDepthConverter<8, 1>;
  converter8to5: NamedDepthConverter<8, 5>;
} : {
  // convert8to4: LibGaf.ColorUtils.DepthConverter<8, 4>;
  converter8to4: NamedDepthConverter<8, 4>;
};

export type TafImageImporter<
  TSubFormat extends TafSubFormat = TafSubFormat,
  TColorDataFormat extends (TafSubFormatToColorDataFormat<TSubFormat>)
    = TafSubFormatToColorDataFormat<TSubFormat>,
  TConfig extends TafImageImporterConfig<TSubFormat>
    = TafImageImporterConfig<TSubFormat>,
> = {
  readonly createResource: (decodedImage: DecodedUserImage, config: TConfig) =>
    Promise<ImporterResultWrapper<TafImporterResult<TColorDataFormat>>>;
};

export const TAF_IMAGE_IMPORTER_1555 = makeCommonTafImageImporter('taf_1555');
export const TAF_IMAGE_IMPORTER_4444 = makeCommonTafImageImporter('taf_4444');
