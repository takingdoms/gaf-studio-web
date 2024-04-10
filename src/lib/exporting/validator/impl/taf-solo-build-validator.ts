import { TafBuildValidator } from "@/lib/exporting/validator/impl/taf-build-validator";
import { ValidatorError, ValidatorFatalError, NodePath } from "@/lib/exporting/validator/build-validator";
import { ValidatedGafLayerData } from "@/lib/exporting/validator/validated-gaf";
import { TafSubFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";
import { VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export class TafSoloBuildValidator extends TafBuildValidator<'taf-solo', 'solo'> {
  constructor(
    private readonly subFormat: TafSubFormat,
  ) {
    super();
  }

  protected buildLayerData(
    virtualFrameData: VirtualFrameDataSingleLayer<'taf-solo'>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafLayerData<'taf', 'solo'>, ValidatorFatalError> {
    return this.exportLayerDataForFormat(
      this.subFormat,
      virtualFrameData.width,
      virtualFrameData.height,
      virtualFrameData.layerData.imageResource,
      path,
      mutErrors,
    );
  }
}
