import { ActualImage } from "@/lib/gaf-studio/image-resource/image-resource";
import { BaseVirtualGafFrameData, VirtualGafEntry, VirtualGafFrame, VirtualGafFrameData, VirtualGafFrameDataMultiLayer, VirtualGafFrameDataSingleLayer, VirtualGafLayerData } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { MakeVirtualGaf } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion"
import LibGaf from "lib-gaf";

export const makeVirtualGafFromCanvas: MakeVirtualGaf = (src) => {
  return {
    entries: makeEntries(src.entries),
  };
};

function makeEntries(srcEntries: LibGaf.GafEntry[]): VirtualGafEntry[] {
  return srcEntries.map((srcEntry) => {
    return {
      key: Symbol(),
      name: srcEntry.name,
      unknown1: srcEntry.unknown1,
      unknown2: srcEntry.unknown2,
      frames: makeFrames(srcEntry.frames),
    };
  });
}

function makeFrames(srcFrames: LibGaf.GafFrame[]): VirtualGafFrame[] {
  return srcFrames.map((srcFrame) => {
    return {
      key: Symbol(),
      duration: srcFrame.duration,
      frameData: makeFrameData(srcFrame.frameData),
    };
  });
}

function makeFrameData(srcFrameData: LibGaf.GafFrameDataSingleLayer):
  VirtualGafFrameDataSingleLayer;
function makeFrameData(srcFrameData: LibGaf.GafFrameDataMultiLayer):
  VirtualGafFrameDataMultiLayer;
function makeFrameData(srcFrameData: LibGaf.GafFrameDataSingleLayer | LibGaf.GafFrameDataMultiLayer):
  VirtualGafFrameDataSingleLayer | VirtualGafFrameDataMultiLayer;
function makeFrameData(srcFrameData: LibGaf.GafFrameData): VirtualGafFrameData {
  const baseData: BaseVirtualGafFrameData = {
    width: srcFrameData.width,
    height: srcFrameData.height,
    xOffset: srcFrameData.xOffset,
    yOffset: srcFrameData.yOffset,
    transparencyIndex: srcFrameData.transparencyIndex,
    unknown2: srcFrameData.unknown2,
    unknown3: srcFrameData.unknown3,
  };

  if (srcFrameData.kind === 'single') {
    return {
      ...baseData,
      kind: 'single',
      key: Symbol(),
      layerData: makeLayerData(srcFrameData.layerData, baseData),
    };
  }

  return {
    ...baseData,
    kind: 'multi',
    layers: srcFrameData.layers.map((layer) => makeFrameData(layer)),
  };
}

// TODO move this \/ to lib-gaf
function isFormat<T extends LibGaf.ColorDataFormat>(colorData: LibGaf.ColorData, format: T):
  colorData is LibGaf.ColorData<T>
{
  return colorData.format === format;
}

function makeLayerData(
  srcLayerData: LibGaf.GafLayerData,
  { width, height }: LibGaf.BaseGafFrameData,
): VirtualGafLayerData {
  if (srcLayerData.kind === 'raw-colors') {
    const colorData = srcLayerData.colorData;
    let convertedData: LibGaf.ColorData<'rgba8888'>;

    if (isFormat(colorData, 'argb1555')) {
      convertedData = LibGaf.ColorUtils.convertARGB1555ToRGBA8888(colorData, width, height, {});
    }
    else if (isFormat(colorData, 'argb4444')) {
      convertedData = LibGaf.ColorUtils.convertARGB4444ToRGBA8888(colorData, width, height, {});
    }
    else {
      throw new Error(`Unexpected color format: ${colorData.format}`);
    }

    const compiledImage = compileImageFromColors(
      width,
      height,
      convertedData,
    );

    return {
      kind: 'raw-colors',
      wrappedImages: {
        kind: 'colored',
        compiledImage,
      },
    };
  }

  return {
    kind: 'palette-idx',
    compress: srcLayerData.decompressed,
    wrappedImages: {
      kind: 'paletted',
      paletteIndices: srcLayerData.indices,
      compiledImage: compileImageFromIndices(),
    },
  };
}

// TODO make something that isn't extremely inneficient
function compileImageFromColors(
  width: number,
  height: number,
  data: LibGaf.ColorData<'rgba8888'>,
): ActualImage {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(data.bytes);

  ctx.putImageData(imageData, 0, 0);
  const dataURL = canvas.toDataURL('image/png');

  /*const img = new Image();
  img.src = dataURL;

  return img;*/
  return dataURL;
}

function compileImageFromIndices(): ActualImage {
  throw 'TODO compileImageFromIndices';
}
