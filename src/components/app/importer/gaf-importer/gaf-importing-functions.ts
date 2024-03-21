import { GafDecodedUserFile, GafDecodedUserFileOk, GafImportedFile } from "@/components/app/importer/gaf-importer/gaf-importing-types";
import { Palette } from "@/lib/image/palette/palette";
import { GafImageImporters } from "@/lib/importing/image-importers/gaf/gaf-image-importer";
import Mime from 'mime';

export namespace GafImportingFunctions {
  export async function decodeImage(
    file: File,
    palette: Palette,
    availableImporters: readonly GafImageImporters[],
  ): Promise<GafDecodedUserFile> {
    const mimeType = Mime.getType(file.name);

    if (mimeType === null) {
      return {
        file,
        error: `Couldn't detect mimeType for file name: ${file.name}.`,
      };
    }

    const ext = Mime.getExtension(mimeType);

    if (ext === null) {
      return {
        file,
        error: `Unsupported mimeType: ${mimeType}`,
      };
    }

    for (const importer of availableImporters) {
      const isSupported = importer.supportedFileExts.includes(ext);

      if (!isSupported) {
        continue;
      }

      const decodedUserImage = await importer.createUserImage(file);

      if ('error' in decodedUserImage) {
        return {
          file,
          error: decodedUserImage.error,
        } satisfies GafDecodedUserFile;
      }

      return {
        file,
        selectedImporter: {
          importer,
          config: importer.makeDefaultConfig({ palette }),
        },
        decodedUserImage,
      } satisfies GafDecodedUserFile;
    }

    return {
      file,
      error: `No decoder available for file extension: ${ext}`,
    };
  }

  export async function importImage(
    decFile: GafDecodedUserFileOk,
  ): Promise<GafImportedFile> {
    const { decodedUserImage, selectedImporter } = decFile;
    const { importer, config } = selectedImporter;
    const importerResult = await importer.createResource(decodedUserImage, config);

    return {
      file: decFile.file,
      selectedImporter,
      decodedUserImage,
      importerResult,
    } satisfies GafImportedFile;
  }
}
