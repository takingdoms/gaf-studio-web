import { BuildExportResult, BuildExporter } from "@/lib/exporting/build-exporter";
import { ValidatorFatalError } from "@/lib/exporting/validator/build-validator";
import { GafBuildValidator } from "@/lib/exporting/validator/impl/gaf-build-validator";
import { Result } from "@/lib/utils/result";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "@takingdoms/lib-gaf";

export class GafBuildExporter implements BuildExporter<'gaf'> {
  export(
    virtualGaf: VirtualGaf<'gaf'>,
    header?: LibGaf.GafHeader,
  ): Result<BuildExportResult<'gaf'>, ValidatorFatalError> {
    const validator = new GafBuildValidator();
    const validatorResult = validator.build(virtualGaf, header);

    if (validatorResult.kind === 'err') {
      return validatorResult;
    }

    return {
      kind: 'ok',
      result: {
        kind: 'gaf',
        gaf: validatorResult.result.actualResult,
        nonFatalErrors: validatorResult.result.errors,
      },
    };
  }
}
