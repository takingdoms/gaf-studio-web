import { ColoredImageResource } from "@/lib/image/image-resource";
import { SimpleImageCompiler } from "@/lib/image/simple-image-compiler";
import LibGaf from "lib-gaf";

/**
 * The main use for this is when importing external image files (such as .pngs or .jpgs)
 * and converting them into image resources to be used in a new VirtualGafLayerData.
 */
export namespace ColoredImageResourceUtils {
  const imageCompiler = new SimpleImageCompiler();

  type Options8888to4444 = {
    depthConvert8to4?: LibGaf.ColorUtils.DepthConverter<8, 4>;
  };

  export function createForTaf4444(
    width: number,
    height: number,
    losslessData: LibGaf.ColorData<'rgba8888'>,
    options: Options8888to4444,
  ): ColoredImageResource<'argb4444'> {
    // converts the original 32-bits image data down to 16-bits image data that goes in the taf
    const convertedData16 = LibGaf.ColorUtils.convertRGBA8888ToARGB4444(
      losslessData,
      width,
      height,
      options,
    );

    // converts the lossy 16-bits image data back to 32-bits. this is done so we can render it
    // as an image in the browser the way the data actually looks like in game.
    const reconvertedData32 = LibGaf.ColorUtils.convertARGB4444ToRGBA8888(
      convertedData16,
      width,
      height,
      {}, // purposefuly empty so it uses the built-in round function
    );

    return {
      kind: 'colored',
      userImage: imageCompiler.compileImage(width, height, losslessData),
      compiledImage: imageCompiler.compileImage(width, height, reconvertedData32),
      colorData: convertedData16,
    };
  }

  type Options8888to1555 = {
    depthConvert8to5?: LibGaf.ColorUtils.DepthConverter<8, 5>;
    depthConvert8to1?: LibGaf.ColorUtils.DepthConverter<8, 1>;
  };

  export function createForTaf1555(
    width: number,
    height: number,
    losslessData: LibGaf.ColorData<'rgba8888'>,
    options: Options8888to1555,
  ): ColoredImageResource<'argb1555'> {
    // converts the original 32-bits image data down to 16-bits image data that goes in the taf
    const convertedData16 = LibGaf.ColorUtils.convertRGBA8888ToARGB1555(
      losslessData,
      width,
      height,
      options,
    );

    // converts the lossy 16-bits image data back to 32-bits. this is done so we can render it
    // as an image in the browser the way the data actually looks like in game.
    const reconvertedData32 = LibGaf.ColorUtils.convertARGB1555ToRGBA8888(
      convertedData16,
      width,
      height,
      {}, // purposefuly empty so it uses the built-in round function
    );

    return {
      kind: 'colored',
      userImage: imageCompiler.compileImage(width, height, losslessData),
      compiledImage: imageCompiler.compileImage(width, height, reconvertedData32),
      colorData: convertedData16,
    };
  }
}
