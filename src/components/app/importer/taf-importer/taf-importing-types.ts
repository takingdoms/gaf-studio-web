import { DecodedUserImage } from "@/lib/importing/image-decoder";
import { ImporterResultWrapper } from "@/lib/importing/image-importer";
import { TafImageImporterConfig, TafImporterResult } from "@/lib/importing/image-importers/taf/taf-image-importer";
import { TafSubFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";

export namespace TafImporting {
  export type Target = {
    kind: 'taf-pair';
    subFormat?: never;
  } | {
    kind: 'taf-solo';
    subFormat: TafSubFormat;
  };

  export type DecodedFile = {
    file: File;
    result: Result<DecodedUserImage, string>;
  };

  export type DecodedFileOk = {
    file: File;
    result: DecodedUserImage;
  };

  export type ConfigPair = {
    config1555: TafImageImporterConfig<'taf_1555'>;
    config4444: TafImageImporterConfig<'taf_4444'>;
  };

  export type ImporterResult = {
    target: 'taf-pair';
    taf_1555: ImporterResultWrapper<TafImporterResult<'argb1555'>>;
    taf_4444: ImporterResultWrapper<TafImporterResult<'argb4444'>>;
  } | {
    target: 'taf-solo';
    subFormat: 'taf_1555';
    taf_1555: ImporterResultWrapper<TafImporterResult<'argb1555'>>;
  } | {
    target: 'taf-solo';
    subFormat: 'taf_4444';
    taf_4444: ImporterResultWrapper<TafImporterResult<'argb4444'>>;
  };

  export type ResultItem = {
    originalfile: File;
    decodedUserImage: DecodedUserImage;
    importerResult: ImporterResult;
    options: ImportOptions;
  };

  export type ImportOptions = {
    center: boolean;
    compress: boolean;
  };
}
