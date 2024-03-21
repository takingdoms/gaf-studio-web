import { BMP_IMAGE_DECODER } from "@/lib/importing/image-decoders/bmp-image-decoder";
import { CommonGafImporterConfig, makeCommonGafImageImporter } from "@/lib/importing/image-importers/gaf/common-gaf-importer";
import { GafImageImporter } from "@/lib/importing/image-importers/gaf/gaf-image-importer";

export type BmpGafImageImporter = GafImageImporter<'bmp', CommonGafImporterConfig>;

export const BMP_GAF_IMAGE_IMPORTER: BmpGafImageImporter = makeCommonGafImageImporter({
  subKind: 'bmp',
  title: 'BMP Importer',
  decoder: BMP_IMAGE_DECODER,
});
