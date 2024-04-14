import { TafBuildValidator } from "@/lib/exporting/validator/impl/taf-build-validator";
import { ValidatorError, ValidatorFatalError, NodePath } from "@/lib/exporting/validator/build-validator";
import { ValidatedGafLayerData } from "@/lib/exporting/validator/validated-gaf";
import { Result } from "@/lib/utils/result";
import { VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export class TafPairBuildValidator extends TafBuildValidator<'taf-pair', 'pair'> {
  protected buildLayerData(
    virtualFrameData: VirtualFrameDataSingleLayer<'taf-pair'>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafLayerData<'taf', 'pair'>, ValidatorFatalError> {
    const result1555 = this.exportLayerDataForFormat(
      'taf_1555',
      virtualFrameData.width,
      virtualFrameData.height,
      virtualFrameData.layerData.imageResource1555,
      [...path, { node: '1555' }],
      mutErrors,
    );

    const result4444 = this.exportLayerDataForFormat(
      'taf_4444',
      virtualFrameData.width,
      virtualFrameData.height,
      virtualFrameData.layerData.imageResource4444,
      [...path, { node: '4444' }],
      mutErrors,
    );

    // TODO maybe find a way to join these two together and return both simultaneously?
    if (result1555.kind === 'err') return result1555;
    if (result4444.kind === 'err') return result4444;

    return {
      kind: 'ok',
      ok: {
        data1555: result1555.ok,
        data4444: result4444.ok,
      },
    };
  }
}
