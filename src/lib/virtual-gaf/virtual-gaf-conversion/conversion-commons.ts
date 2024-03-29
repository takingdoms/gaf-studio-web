import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { BaseVirtualGafFrameData, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export namespace ConversionCommons {
  export function makeBaseFrameData(srcFrameData: LibGaf.GafFrameData): BaseVirtualGafFrameData {
    return {
      width: srcFrameData.width,
      height: srcFrameData.height,
      xOffset: srcFrameData.xOffset,
      yOffset: srcFrameData.yOffset,
      transparencyIndex: srcFrameData.transparencyIndex,
      unknown2: srcFrameData.unknown2,
      unknown3: srcFrameData.unknown3,
    };
  }

  export function compileTafImage(
    srcColorData: LibGaf.ColorData<"argb1555" | "argb4444">,
    width: number,
    height: number,
    imageCompiler: ImageCompiler,
  ): ImageData {
    let convertedData: LibGaf.ColorData<'rgba8888'>;

    if (isFormat(srcColorData, 'argb1555')) {
      convertedData = LibGaf.ColorUtils.convertARGB1555ToRGBA8888(
        srcColorData,
        width,
        height,
        {
          depthConvert1to8: LibGaf.ColorUtils.DepthConverters.round1to8,
          depthConvert5to8: LibGaf.ColorUtils.DepthConverters.round5to8,
        },
      );
    }
    else if (isFormat(srcColorData, 'argb4444')) {
      convertedData = LibGaf.ColorUtils.convertARGB4444ToRGBA8888(
        srcColorData,
        width,
        height,
        {}, // purposefuly empty so it uses the built-in round function
      );
    }
    else {
      throw new Error(`Unexpected color format: ${srcColorData.format}`);
    }

    return imageCompiler.compileImage(width, height, convertedData);
  }

  // TODO move this \/ to lib-gaf
  export function isFormat<T extends LibGaf.ColorDataFormat>(
    colorData: LibGaf.ColorData,
    format: T,
  ): colorData is LibGaf.ColorData<T> {
    return colorData.format === format;
  }
}
