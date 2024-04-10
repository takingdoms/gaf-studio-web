import { ValidatorError, ValidatorFatalError } from "@/lib/exporting/validator/build-validator";
import { MainFormat, TafSubFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export type GafBuildExporterResult = {
  kind: 'gaf';
  gaf: LibGaf.GafResult<'gaf'>;
  nonFatalErrors: ValidatorError[];
};

export type TafSoloBuildExporterResult = {
  kind: 'taf-solo';
  subFormat: TafSubFormat;
  taf: LibGaf.GafResult<'taf'>;
  nonFatalErrors: ValidatorError[];
};

export type TafPairBuildExporterResult = {
  kind: 'taf-pair';
  taf1555: LibGaf.GafResult<'taf'>;
  taf4444: LibGaf.GafResult<'taf'>;
  nonFatalErrors: ValidatorError[];
};

export type AnyBuildExporterResult =
  | GafBuildExporterResult
  | TafSoloBuildExporterResult
  | TafPairBuildExporterResult;

export type BuildExportResult<T extends MainFormat> =
  T extends 'gaf' ? GafBuildExporterResult :
  T extends 'taf-solo' ? TafSoloBuildExporterResult :
  T extends 'taf-pair' ? TafPairBuildExporterResult :
  never;

export type BuildExporter<TMainFormat extends MainFormat> = {
  readonly export: (
    virtualGaf: VirtualGaf<TMainFormat>,
    header?: LibGaf.GafHeader,
  ) => Result<BuildExportResult<TMainFormat>, ValidatorFatalError>;
};

/*
export type BuildExporter<
  TMainFormat extends MainFormat = MainFormat,
  TGafFormat extends LibGaf.GafFormat = LibGaf.GafFormat,
  TWrapperKind extends 'solo' | 'pair' = 'solo' | 'pair',
> = {
  readonly validate: (
    virtualGaf: VirtualGaf<TMainFormat>,
    header?: LibGaf.GafHeader,
  ) => Result<ValidatedGafResult<TGafFormat, TWrapperKind>, ValidatorFatalError>;

  readonly build: (
    validatedResult: ValidatedGafResult<TGafFormat, TWrapperKind>,
  ) => Result<BuildExportResult<TMainFormat>, BuilderError>;
};

*/
