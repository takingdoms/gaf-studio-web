import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { BaseVirtualGafFrameData, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import { SimpleVirtualGafBuilder } from "@/lib/virtual-gaf/virtual-gaf-conversion/simple-virtual-gaf-builder";
import LibGaf from "lib-gaf";

export class ColoredVirtualGafBuilder extends SimpleVirtualGafBuilder<'taf'> {
  constructor(
    private readonly imageCompiler: ImageCompiler,
  ) {
    super();
  }

  protected override makeLayerData(
    srcLayerData: LibGaf.GafLayerData<'taf'>,
    { width, height }: BaseVirtualGafFrameData,
  ): VirtualLayerData<'taf'> {
    const srcColorData = srcLayerData.colorData;
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

    const compiledImage = this.imageCompiler.compileImage(width, height, convertedData);

    return {
      kind: 'raw-colors',
      imageResource: {
        kind: 'colored',
        compiledImage,
        colorData: srcColorData,
      },
    };
  }
}

// TODO move this \/ to lib-gaf
function isFormat<T extends LibGaf.ColorDataFormat>(colorData: LibGaf.ColorData, format: T):
  colorData is LibGaf.ColorData<T>
{
  return colorData.format === format;
}
