import { Debug } from "@/lib/debug/debug";
import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { ColoredImageResource } from "@/lib/image/image-resource";
import { TafImageImporter, TafImageImporterConfig, TafImporterResult } from "@/lib/importing/image-importers/taf/taf-image-importer";
import { TafSubFormat, TafSubFormatToColorDataFormat } from "@/lib/main-format";
import { ConversionCommons } from "@/lib/virtual-gaf/virtual-gaf-conversion/conversion-commons";
import LibGaf from "@takingdoms/lib-gaf";

const imageCompiler = new SimpleImageCompiler();

export function makeCommonTafImageImporter<T extends TafSubFormat>(subFormat: T):
  TafImageImporter<T>
{
  type Result = TafImporterResult<TafSubFormatToColorDataFormat<T>>;

  return {
    createResource: async (decodedImage, config) => {
      const { width, height } = decodedImage.metadata;
      const srcBytes = decodedImage.colorData.bytes;

      Debug.assertEq(width * height * 4, srcBytes.length);

      let result: Result;

      if (subFormat === 'taf_1555') {
        const config1555 = config as TafImageImporterConfig<'taf_1555'>;

        const colorData1555 = LibGaf.ColorUtils.convertRGBA8888ToARGB1555(
          decodedImage.colorData,
          width,
          height,
          {
            depthConvert8to1: config1555.converter8to1.converter,
            depthConvert8to5: config1555.converter8to5.converter,
          },
        );

        const compiledImage = ConversionCommons.compileTafImage(
          colorData1555,
          width,
          height,
          imageCompiler,
        );

        const result1555: TafImporterResult<'argb1555'> = {
          lossyPixelMatches: 'TODO',
          resource: {
            kind: 'colored',
            colorData: colorData1555,
            compiledImage,
          },
        };

        result = result1555 as Result;
      }
      else {
        const config4444 = config as TafImageImporterConfig<'taf_4444'>;

        const colorData4444 = LibGaf.ColorUtils.convertRGBA8888ToARGB4444(
          decodedImage.colorData,
          width,
          height,
          {
            depthConvert8to4: config4444.converter8to4.converter,
          },
        );

        const compiledImage = ConversionCommons.compileTafImage(
          colorData4444,
          width,
          height,
          imageCompiler,
        );

        const result4444: TafImporterResult<'argb4444'> = {
          lossyPixelMatches: 'TODO',
          resource: {
            kind: 'colored',
            colorData: colorData4444,
            compiledImage,
          },
        };

        result = result4444 as Result;
      }

      return {
        kind: 'success',
        result,
      };
    },
  };
}
