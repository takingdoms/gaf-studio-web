import { BaseVirtualGafFrameData, VirtualGafLayerData } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { SimpleVirtualGafBuilder } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion/simple-virtual-gaf-builder";
import { ImageCompiler } from "@/lib/image/image-compiler";
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
  ): VirtualGafLayerData<'taf'> {
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

    const compiledImage = this.imageCompiler.compileImage(width, height, convertedData);

    return {
      kind: 'raw-colors',
      wrappedImages: {
        kind: 'colored',
        compiledImage,
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
