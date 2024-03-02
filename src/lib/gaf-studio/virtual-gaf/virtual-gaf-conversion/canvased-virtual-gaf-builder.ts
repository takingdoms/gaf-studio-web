import { BaseVirtualGafFrameData, VirtualGafEntry, VirtualGafFrame, VirtualGafFrameData, VirtualGafFrameDataMultiLayer, VirtualGafFrameDataSingleLayer, VirtualGafLayerData } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { MakeVirtualGaf } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion"
import { ImageCompiler } from "@/lib/image/image-compiler";
import { ActualImage } from "@/lib/image/image-resource";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import LibGaf from "lib-gaf";

type Config = {
  imgCompiler: ImageCompiler;
  palette?: Palette; // not used for tafs (TODO refactor since this prop is MANADATORY when for gafs)
};

type Context = {
  config: Config;
};

// TODO split into one for gafs (with palette) and one without palette
export const canvasedVirtualGafBuilder = (config: Config): MakeVirtualGaf => (src) => {
  const ctx = { config };

  return {
    entries: makeEntries(ctx, src.entries),
  };
};

function makeEntries(ctx: Context, srcEntries: LibGaf.GafEntry[]): VirtualGafEntry[] {
  return srcEntries.map((srcEntry) => {
    return {
      key: Symbol(),
      name: srcEntry.name,
      unknown1: srcEntry.unknown1,
      unknown2: srcEntry.unknown2,
      frames: makeFrames(ctx, srcEntry.frames),
    };
  });
}

function makeFrames(ctx: Context, srcFrames: LibGaf.GafFrame[]): VirtualGafFrame[] {
  return srcFrames.map((srcFrame) => {
    return {
      key: Symbol(),
      duration: srcFrame.duration,
      frameData: makeFrameData(ctx, srcFrame.frameData),
    };
  });
}

function makeFrameData(ctx: Context, srcFrameData: LibGaf.GafFrameDataSingleLayer):
  VirtualGafFrameDataSingleLayer;
function makeFrameData(ctx: Context, srcFrameData: LibGaf.GafFrameDataMultiLayer):
  VirtualGafFrameDataMultiLayer;
function makeFrameData(
  ctx: Context,
  srcFrameData: LibGaf.GafFrameDataSingleLayer | LibGaf.GafFrameDataMultiLayer,
): VirtualGafFrameDataSingleLayer | VirtualGafFrameDataMultiLayer;
function makeFrameData(ctx: Context, srcFrameData: LibGaf.GafFrameData): VirtualGafFrameData {
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
      layerData: makeLayerData(ctx, srcFrameData.layerData, baseData),
    };
  }

  return {
    ...baseData,
    kind: 'multi',
    layers: srcFrameData.layers.map((layer) => makeFrameData(ctx, layer)),
  };
}

// TODO move this \/ to lib-gaf
function isFormat<T extends LibGaf.ColorDataFormat>(colorData: LibGaf.ColorData, format: T):
  colorData is LibGaf.ColorData<T>
{
  return colorData.format === format;
}

function makeLayerData(
  ctx: Context,
  srcLayerData: LibGaf.GafLayerData,
  { width, height, transparencyIndex }: LibGaf.BaseGafFrameData,
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
      ctx,
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

  // TODO eventually make Palette a required prop of config
  // In order to do this, there'll be two Config types (and builder function types),
  // one for gafs and one for tafs
  if (ctx.config.palette === undefined) {
    throw new Error(`No palette provided.`);
  }

  const compiledImage = compileImageFromIndices(
    ctx,
    width,
    height,
    transparencyIndex,
    srcLayerData.indices,
    ctx.config.palette,
  );

  return {
    kind: 'palette-idx',
    compress: srcLayerData.decompressed,
    wrappedImages: {
      kind: 'paletted',
      paletteIndices: srcLayerData.indices,
      compiledImage,
    },
  };
}

// TODO make something that isn't extremely inneficient
function compileImageFromColors(
  ctx: Context,
  width: number,
  height: number,
  data: LibGaf.ColorData<'rgba8888'>,
): ActualImage {
  return ctx.config.imgCompiler.compileImage(width, height, data);
}

function compileImageFromIndices(
  ctx: Context,
  width: number,
  height: number,
  transparencyIndex: number,
  indices: Uint8Array,
  palette: Palette,
): ActualImage {
  const colorData = PaletteUtils.createColorData(
    width,
    height,
    transparencyIndex,
    indices,
    palette,
  );

  return compileImageFromColors(ctx, width, height, colorData);
}
