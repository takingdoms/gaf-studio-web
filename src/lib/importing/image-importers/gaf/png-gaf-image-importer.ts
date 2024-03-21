import { PNG_IMAGE_DECODER } from "@/lib/importing/image-decoders/png-image-decoder";
import { CommonGafImporterConfig, makeCommonGafImageImporter } from "@/lib/importing/image-importers/gaf/common-gaf-importer";
import { GafImageImporter } from "@/lib/importing/image-importers/gaf/gaf-image-importer";

export type PngGafImageImporter = GafImageImporter<'png', CommonGafImporterConfig>;

export const PNG_GAF_IMAGE_IMPORTER: PngGafImageImporter = makeCommonGafImageImporter({
  subKind: 'png',
  title: 'PNG Importer',
  decoder: PNG_IMAGE_DECODER,
});
