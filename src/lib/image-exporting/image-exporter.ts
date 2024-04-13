import { DownloadUtils } from '@/lib/downloading/download-utils';
import { ImageNaming } from '@/lib/image-exporting/image-naming';
import { downloadZip } from 'client-zip';

export namespace ImageExporter {
  export type Item = {
    readonly image: ImageData;
    readonly entryName: string;
    readonly entryIndex: number;
    readonly frameIndex: number;
    readonly subframeIndex?: number;
  };

  export async function exportFramesAsDownloadableZip(
    items: Item[],
    fileNameWithoutExtension: string,
  ): Promise<DownloadUtils.Downloadable> {
    const itemBlobsPromises = items.map(async (item) => {
      const blob = await convertImageDataToBlob(item.image);

      return {
        item,
        blob,
      };
    });

    const itemBlobs = await Promise.all(itemBlobsPromises);

    const now = new Date();
    const empty = new Uint8Array([]);

    const blob = await downloadZip(itemBlobs.map((itemBlob) => {
      const name = ImageNaming.nameFrameOrSubframe({
        suffix: itemBlob.blob === null ? ' (error)' : undefined,
        ext: 'png',
        entryName: itemBlob.item.entryName,
        entryIndex: itemBlob.item.entryIndex,
        frameIndex: itemBlob.item.frameIndex,
        subframeIndex: itemBlob.item.subframeIndex,
      });

      return {
        name,
        lastModified: now,
        input: itemBlob.blob ?? empty,
      };
    })).blob();

    // TODO add the name of the CurrentGaf into the zip's fileName
    return DownloadUtils.createDownloadable(blob, fileNameWithoutExtension + '.zip');
  }

  // Written partly by ChatGPT
  export function convertImageDataToBlob(imageData: ImageData): Promise<Blob | null> {
    // Create a temporary canvas element
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context not supported');
    }

    // Set canvas dimensions to match imageData
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    // Put the imageData onto the canvas
    ctx.putImageData(imageData, 0, 0);

    // ChatGPT's code ends here /\

    return new Promise((resolve, reject) => {
      canvas.toBlob(resolve, 'image/png', 1.0);
    });
  }
}
