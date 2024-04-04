import { TafImporting } from "@/components/app/importer/taf-importer/taf-importing-types";
import { DecodedUserImage, ImageDecoder } from "@/lib/importing/image-decoder";
import { TAF_IMAGE_IMPORTER_1555, TAF_IMAGE_IMPORTER_4444 } from "@/lib/importing/image-importers/taf/taf-image-importer";
import Mime from "mime";

export namespace TafImportingFunctions {
  export async function decodeImage(
    file: File,
    availableDecoders: readonly ImageDecoder[],
  ): Promise<TafImporting.DecodedFile> {
    const mimeType = Mime.getType(file.name);

    if (mimeType === null) {
      return {
        file,
        result: {
          kind: 'err',
          error: `Couldn't detect mimeType for file name: ${file.name}.`,
        },
      };
    }

    const ext = Mime.getExtension(mimeType);

    if (ext === null) {
      return {
        file,
        result: {
          kind: 'err',
          error: `Unsupported mimeType: ${mimeType}`,
        },
      };
    }

    for (const decoder of availableDecoders) {
      const isSupported = decoder.supportedFileExts.includes(ext);

      if (!isSupported) {
        continue;
      }

      const decodedUserImage = await decoder.decodeFile(file);

      if ('error' in decodedUserImage) {
        return {
          file,
          result: {
            kind: 'err',
            error: decodedUserImage.error,
          }
        };
      }

      return {
        file,
        result: {
          kind: 'ok',
          result: decodedUserImage,
        },
      };
    }

    return {
      file,
      result: {
        kind: 'err',
        error: `No decoder available for file extension: ${ext}`,
      },
    };
  }

  export async function compileItem(
    target: TafImporting.Target,
    sourceImage: DecodedUserImage,
    configs: TafImporting.ConfigPair,
  ): Promise<TafImporting.ImporterResult> {
    if (target.kind === 'taf-pair') {
      const promise1555 = TAF_IMAGE_IMPORTER_1555.createResource(sourceImage, configs.config1555);
      const promise4444 = TAF_IMAGE_IMPORTER_4444.createResource(sourceImage, configs.config4444);

      return Promise.all([promise1555, promise4444]).then(([taf_1555, taf_4444]) => {
        return {
          target: 'taf-pair',
          taf_1555,
          taf_4444,
        };
      });
    }

    if (target.subFormat === 'taf_1555') {
      return TAF_IMAGE_IMPORTER_1555.createResource(sourceImage, configs.config1555)
        .then((taf_1555) => ({
          target: 'taf-solo',
          subFormat: 'taf_1555',
          taf_1555,
        }));
    }

    return TAF_IMAGE_IMPORTER_4444.createResource(sourceImage, configs.config4444)
      .then((taf_4444) => ({
        target: 'taf-solo',
        subFormat: 'taf_4444',
        taf_4444,
      }));
  }
}
