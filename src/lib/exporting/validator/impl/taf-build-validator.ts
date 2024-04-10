import { BuildValidator, ValidatorError, ValidatorFatalError, NodePath } from "@/lib/exporting/validator/build-validator";
import { ColoredImageResource } from "@/lib/image/image-resource";
import { TafSubFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";
import LibGaf from "lib-gaf";

export abstract class TafBuildValidator<
  TFormat extends 'taf-solo' | 'taf-pair',
  TWrapperKind extends 'solo' | 'pair',
> extends BuildValidator<TFormat, 'taf', TWrapperKind> {
  protected exportLayerDataForFormat(
    subFormat: TafSubFormat,
    frameDataWidth: number,
    frameDataHeight: number,
    imageResource: ColoredImageResource,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<LibGaf.GafLayerDataRawColors, ValidatorFatalError> {
    const colorData = imageResource.colorData;

    const expectedColorFormat = subFormat === 'taf_1555' ? 'argb1555' : 'argb4444';

    if (colorData.format !== expectedColorFormat) {
      const message = `Wrong image color data format. Expected: ${expectedColorFormat}; Got:`
        + ` ${colorData.format}`;

      return {
        kind: 'err',
        error: { path, message, nonFatalErrors: mutErrors },
      };
    }

    const imageLength = colorData.bytes.length;
    const expectedLength = frameDataWidth * frameDataHeight;

    // * 2 because each pixel is two bytes (16-bits)
    if (imageLength !== expectedLength * 2) {
      const message = `Number of image pixels (${imageLength * 2}) doesn't match with the frame`
        + ` dimensions (${frameDataWidth} x ${frameDataHeight}).`;

      return {
        kind: 'err',
        error: { path, message, nonFatalErrors: mutErrors },
      };
    }

    return {
      kind: 'ok',
      result: {
        kind: 'raw-colors',
        colorData,
      },
    };
  }
}
