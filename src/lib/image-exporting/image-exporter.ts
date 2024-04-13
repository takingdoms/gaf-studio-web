import { DownloadUtils } from '@/lib/downloading/download-utils';
import { ImageNaming } from '@/lib/image-exporting/image-naming';
import { MainFormat, TafSubFormat } from '@/lib/main-format';
import { VirtualFrame, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer, VirtualLayerData } from '@/lib/virtual-gaf/virtual-gaf';
import { downloadZip } from 'client-zip';

export namespace ImageExporter {
  export type Item = {
    readonly image: ImageData;
    readonly entryName: string;
    readonly frameIndex: number;
    readonly subframeIndex?: number;
  };

  export function framesToItems({
    entryName,
    frames,
    frameIndex,
    format,
    activePairSubFormat,
  }: {
    entryName: string;
    frames: readonly VirtualFrame[];
    frameIndex?: number; // when used; will export only its subframes
    format: MainFormat;
    activePairSubFormat: TafSubFormat;
  }): Item[] {
    const items: ImageExporter.Item[] = [];

    if (frameIndex === undefined) {
      frames.forEach((frame, nextFrameIndex) => {
        const next = frameToItem({
          entryName,
          frame,
          frameIndex: nextFrameIndex,
          format,
          activePairSubFormat,
        });

        if (Array.isArray(next)) {
          items.push(...next);
        } else {
          items.push(next);
        }
      });
    }
    else {
      const frame = frames[frameIndex];

      if (frame.frameData.kind === 'single') {
        throw new Error(`Active frame lacks subframes!`);
      }

      const subItems = subframesToItems({
        entryName,
        frameData: frame.frameData,
        frameIndex,
        format,
        activePairSubFormat,
      });

      items.push(...subItems);
    }

    return items;
  }

  export function subframesToItems({
    entryName,
    frameData,
    frameIndex,
    format,
    activePairSubFormat,
  }: {
    entryName: string;
    frameData: VirtualFrameDataMultiLayer;
    frameIndex: number;
    format: MainFormat;
    activePairSubFormat: TafSubFormat;
  }): Item[] {
    const items: Item[] = [];

    frameData.layers.forEach((subframe, nextSubframeIndex) => {
      const base = {
        entryName: entryName,
        frameIndex,
        subframeIndex: nextSubframeIndex,
      } satisfies Partial<ImageExporter.Item>;

      const image = imageDataFromLayerData(subframe.layerData, format, activePairSubFormat);

      items.push({
        ...base,
        image,
      });
    });

    return items;
  }

  export function frameToItem({
    frame,
    entryName,
    frameIndex,
    format,
    activePairSubFormat,
  }: {
    frame: VirtualFrame;
    entryName: string;
    frameIndex: number;
    format: MainFormat;
    activePairSubFormat: TafSubFormat;
  }): Item | Item[] {
    const base = {
      // entryIndex,
      entryName: entryName,
      frameIndex,
    } satisfies Partial<ImageExporter.Item>;

    let subframeIndex: number | undefined;
    let layer: VirtualFrameDataSingleLayer;

    if (frame.frameData.kind === 'single') {
      layer = frame.frameData;
    } else {
      return subframesToItems({
        frameData: frame.frameData,
        entryName,
        frameIndex,
        format,
        activePairSubFormat,
      });
    }

    const image = imageDataFromLayerData(layer.layerData, format, activePairSubFormat);

    return {
      ...base,
      image,
      subframeIndex,
    };
  }

  function imageDataFromLayerData(
    layerData: VirtualLayerData,
    format: MainFormat,
    activePairSubFormat: TafSubFormat,
  ): ImageData {
    if (format === 'taf-pair') {
      return (layerData as VirtualLayerData<'taf-pair'>)[
        activePairSubFormat === 'taf_1555' ? 'imageResource1555' : 'imageResource4444'
      ].compiledImage;
    }
    else {
      return (layerData as VirtualLayerData<'gaf' | 'taf-solo'>).imageResource.compiledImage;
    }
  }

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
        entryNameOrIndex: itemBlob.item.entryName,
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
