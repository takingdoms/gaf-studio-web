import { DownloadUtils } from '@/lib/downloading/download-utils';
import { ImageNaming } from '@/lib/image-exporting/image-naming';
import { MainFormat, TafSubFormat } from '@/lib/main-format';
import { CurrentGaf } from '@/lib/state/gaf-studio/current-gaf';
import { StringUtils } from '@/lib/utils/string-utils';
import { VirtualEntry, VirtualFrame, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer, VirtualLayerData } from '@/lib/virtual-gaf/virtual-gaf';
import { InputFolder, InputWithMeta, InputWithSizeMeta, InputWithoutMeta, downloadZip } from 'client-zip';

type ZipFiles = Array<InputWithMeta | InputWithSizeMeta | InputWithoutMeta | InputFolder>;

export namespace ImageExporter {
  export type Item = {
    readonly image: ImageData;
    readonly entryName: string;
    readonly frameIndex: number;
    readonly subframeIndex?: number;
  };

  export type ItemTree = Record<string, Item[]>; // usually every key corresponds to an entry's name

  export type ItemTreeWrapper = {
    kind: 'single';
    tree: ItemTree;
    baseFileName: string; // used for the zip itself
  } | {
    kind: 'taf-pair';
    baseFileName: string; // used for the zip itself
    taf_1555: {
      tree: ItemTree;
      dirName: string; // used for the taf1555 directory inside the zip
    };
    taf_4444: {
      tree: ItemTree;
      dirName: string; // used for the taf1555 directory inside the zip
    };
  }

  export function currentGafToItemTreeWrapper(params: {
    currentGaf: CurrentGaf;
    format: MainFormat;
    activePairSubFormat: TafSubFormat; // ignored when format === 'taf-pair' (yep)
  }): ItemTreeWrapper {
    if (params.format === 'gaf' || params.format === 'taf-solo') {
      const baseFileName = params.currentGaf.kind === 'from-file-single'
        ? StringUtils.fileNameWithoutExtension(params.currentGaf.fileName)
        : 'everything';

      return {
        kind: 'single',
        tree: entriesToItemTree({
          entries: params.currentGaf.virtualGaf.entries,
          format: params.format,
          activePairSubFormat: params.activePairSubFormat,
        }),
        baseFileName,
      };
    }

    let baseFileName: string;
    let dirName1555: string;
    let dirName4444: string;

    if (params.currentGaf.kind === 'from-file-pair') {
      dirName1555 = StringUtils.fileNameWithoutExtension(params.currentGaf.data1555.fileName);
      dirName4444 = StringUtils.fileNameWithoutExtension(params.currentGaf.data4444.fileName);

      let start = StringUtils.commonPrefix(dirName1555, dirName4444);
      if (start.endsWith('_')) start = start.substring(0, start.length - 1);

      baseFileName = start === '' ? 'everything' : start;
    }
    else {
      baseFileName = 'everything';
      dirName1555 = '_1555';
      dirName4444 = '_4444';
    }

    return {
      kind: 'taf-pair',
      baseFileName,
      taf_1555: {
        tree: entriesToItemTree({
          entries: params.currentGaf.virtualGaf.entries,
          format: params.format,
          activePairSubFormat: 'taf_1555',
        }),
        dirName: dirName1555,
      },
      taf_4444: {
        tree: entriesToItemTree({
          entries: params.currentGaf.virtualGaf.entries,
          format: params.format,
          activePairSubFormat: 'taf_4444',
        }),
        dirName: dirName4444,
      },
    };
  }

  export function entriesToItemTree(params: {
    entries: readonly VirtualEntry[];
    format: MainFormat;
    activePairSubFormat: TafSubFormat;
  }): ItemTree {
    const result: ItemTree = {};

    const padStartLength = (params.entries.length).toString().length;

    const indexedNameEntries = params.entries.map((entry, index) => {
      const idx = (index + 1).toString().padStart(padStartLength, '0');

      return {
        ...entry,
        __indexedName: `(${idx}) ${entry.name}`,
      };
    });

    for (const entry of indexedNameEntries) {
      result[entry.__indexedName] = framesToItems({
        entryName: entry.name,
        frames: entry.frames,
        format: params.format,
        activePairSubFormat: params.activePairSubFormat,
      });
    }

    return result;
  }

  export function isTreeEmpty(tree: ItemTree): boolean {
    return Object.values(tree).every((node) => {
      return node.length === 0;
    });
  }

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

  export async function exportItemTreeWrapperAsDownloadableZip(
    itemTreeWrapper: ItemTreeWrapper,
  ): Promise<DownloadUtils.Downloadable> {
    const now = new Date();
    const mutZipFiles: ZipFiles = [];

    if (itemTreeWrapper.kind === 'single') {
      await addTree(itemTreeWrapper.tree, now, mutZipFiles, null);
    }
    else {
      const dir1555 = itemTreeWrapper.taf_1555.dirName;
      const dir4444 = itemTreeWrapper.taf_4444.dirName;

      mutZipFiles.push({
        name: dir1555,
        lastModified: now,
      });

      mutZipFiles.push({
        name: dir4444,
        lastModified: now,
      });

      await addTree(itemTreeWrapper.taf_1555.tree, now, mutZipFiles, dir1555);
      await addTree(itemTreeWrapper.taf_4444.tree, now, mutZipFiles, dir4444);
    }

    const blob = await downloadZip(mutZipFiles).blob();

    return DownloadUtils.createDownloadable(blob, itemTreeWrapper.baseFileName + '.zip');
  }

  async function addTree(
    tree: ItemTree,
    now: Date,
    mutZipFiles: ZipFiles,
    baseFolder: string | null,
  ) {
    for (const [key, value] of Object.entries(tree)) {
      const folder = baseFolder === null ? key : `${baseFolder}/${key}`;
      const items = value;

      mutZipFiles.push({
        name: folder + '/',
        lastModified: now,
      });

      const itemBlobs = await Promise.all(
        items.map(async (item) => ({
          item,
          blob: await convertImageDataToBlob(item.image),
        }))
      );

      const itemZipFiles = itemBlobs.map((itemBlob) => itemToZipFile(folder, itemBlob, now));
      mutZipFiles.push(...itemZipFiles);
    }
  }

  export async function exportItemsAsDownloadableZip(
    items: Item[],
    baseFileName: string,
  ): Promise<DownloadUtils.Downloadable> {
    const itemBlobs = await Promise.all(
      items.map(async (item) => ({
        item,
        blob: await convertImageDataToBlob(item.image),
      }))
    );

    const now = new Date();
    const zipFiles = itemBlobs.map((itemBlob) => itemToZipFile(null, itemBlob, now));
    const blob = await downloadZip(zipFiles).blob();

    // TODO add the name of the CurrentGaf into the zip's fileName
    return DownloadUtils.createDownloadable(blob, baseFileName + '.zip');
  }

  const empty = new Uint8Array([]);

  function itemToZipFile(
    folder: string | null,
    itemBlob: { item: Item; blob: Blob | null },
    lastModified: Date,
  ) {
    const name = ImageNaming.nameFrameOrSubframe({
      suffix: itemBlob.blob === null ? ' (error)' : undefined,
      ext: 'png',
      entryNameOrIndex: itemBlob.item.entryName,
      frameIndex: itemBlob.item.frameIndex,
      subframeIndex: itemBlob.item.subframeIndex,
    });

    return {
      name: folder === null ? name : `${folder}/${name}`,
      lastModified,
      input: itemBlob.blob ?? empty,
      size: itemBlob.blob === null ? 0 : undefined,
    };
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
