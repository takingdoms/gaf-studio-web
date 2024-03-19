import { DecodedUserImage } from "@/lib/importing/image-decoder";
import { ImporterResultWrapper } from "@/lib/importing/image-importer";
import { GafImageImporters, GafImporterResult } from "@/lib/importing/image-importers/gaf/gaf-image-importer";

export type GafSelectedImporter<
  TImporter extends GafImageImporters = GafImageImporters
> = {
  importer: TImporter;
  config: ReturnType<TImporter['makeDefaultConfig']>;
};

export type GafDecodedUserFile = {
  file: File;
} & (
  {
    selectedImporter: GafSelectedImporter;
    decodedUserImage: DecodedUserImage;
    error?: never;
  }
  |
  {
    selectedImporter?: never;
    decodedUserImage?: never;
    error: string;
  }
);

export type GafDecodedUserFileOk = GafDecodedUserFile & { error?: never };

export type GafImportedFile = {
  file: File;
  selectedImporter: GafSelectedImporter;
  decodedUserImage: DecodedUserImage;
  importerResult: ImporterResultWrapper<GafImporterResult>;
};

export type GafConfiguredFile = {
  importedFile: GafImportedFile;
  options: GafImportOptions;
};

export type GafImportOptions = {
  transparencyIndex: number;
  center: boolean;
  compress: boolean;
};

export function isDecodedUserFileOk(decFile: GafDecodedUserFile): decFile is GafDecodedUserFileOk {
  return decFile.error === undefined;
}
