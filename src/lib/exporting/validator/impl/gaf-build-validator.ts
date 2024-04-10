import { BuildValidator, ValidatorError, ValidatorFatalError, NodePath } from "@/lib/exporting/validator/build-validator";
import { ValidatedGafLayerData } from "@/lib/exporting/validator/validated-gaf";
import { Result } from "@/lib/utils/result";
import { VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export class GafBuildValidator extends BuildValidator<'gaf', 'gaf', 'solo'> {
  protected buildLayerData(
    virtualFrameData: VirtualFrameDataSingleLayer<'gaf'>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafLayerData<'gaf', 'solo'>, ValidatorFatalError> {
    const indices = virtualFrameData.layerData.imageResource.paletteIndices;
    const expectedLength = virtualFrameData.width * virtualFrameData.height;

    if (indices.length !== expectedLength) {
      const message = `Number of palette indices (${indices.length}) doesn't match with the`
        + ` frame dimensions (${virtualFrameData.width} x ${virtualFrameData.height}).`;

      return {
        kind: 'err',
        error: { path, message, nonFatalErrors: mutErrors },
      };
    }

    for (let i = 0; i < indices.length; i++) {
      const next = indices[i];

      if (next < 0 || next > 255) {
        return {
          kind: 'err',
          error: {
            path,
            message: `Invalid byte "${next}" at index ${i} of the palette.`,
            nonFatalErrors: mutErrors,
          },
        };
      }
    }

    return {
      kind: 'ok',
      result: {
        kind: 'palette-idx',
        decompressed: virtualFrameData.layerData.compress,
        indices,
      },
    };
  }
}
