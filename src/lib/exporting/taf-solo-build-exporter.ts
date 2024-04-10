import { BuildExportResult, BuildExporter } from "@/lib/exporting/build-exporter";
import { ValidatorFatalError } from "@/lib/exporting/validator/build-validator";
import { TafSoloBuildValidator } from "@/lib/exporting/validator/impl/taf-solo-build-validator";
import { TafSubFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export class TafSoloBuildExporter implements BuildExporter<'taf-solo'> {
  constructor(private readonly subFormat: TafSubFormat) {}

  export(
    virtualGaf: VirtualGaf<'taf-solo'>,
    header?: LibGaf.GafHeader,
  ): Result<BuildExportResult<'taf-solo'>, ValidatorFatalError> {
    const validator = new TafSoloBuildValidator(this.subFormat);
    const validatorResult = validator.build(virtualGaf, header);

    if (validatorResult.kind === 'err') {
      return validatorResult;
    }

    return {
      kind: 'ok',
      result: {
        kind: 'taf-solo',
        subFormat: this.subFormat,
        taf: validatorResult.result.actualResult,
        nonFatalErrors: validatorResult.result.errors,
      },
    };
  }
}
