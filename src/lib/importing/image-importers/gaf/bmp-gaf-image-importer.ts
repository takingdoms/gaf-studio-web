import { BMP_IMAGE_DECODER } from "@/lib/importing/image-decoders/bmp-image-decoder";
import { CommonGafImporterConfig, makeCommonGafImageImporter } from "@/lib/importing/image-importers/gaf/common-gaf-importer";
import { GafImageImporter } from "@/lib/importing/image-importers/gaf/gaf-image-importer";

const bmpKind = Symbol('bmp');

export type BmpGafImageImporter = GafImageImporter<typeof bmpKind, CommonGafImporterConfig>;

export const BMP_GAF_IMAGE_IMPORTER: BmpGafImageImporter = makeCommonGafImageImporter({
  subKind: bmpKind,
  title: 'BMP Importer',
  decoder: BMP_IMAGE_DECODER,
});
