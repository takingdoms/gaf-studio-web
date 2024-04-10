import { ExportFileName } from "@/components/app/exporter/Export";
import { BuildExportResult } from "@/lib/exporting/build-exporter";
import { MainFormat } from "@/lib/main-format";

export namespace ExportUtils {
  export function getFileNameFor<T extends MainFormat>(
    exportFileName: ExportFileName,
    okExporterResult: BuildExportResult<T>,
    target?: '1555' | '4444', // used only for 'taf-pair' kind (in which case it should be mandatory)
  ): string {
    if (typeof exportFileName === 'string') {
      return exportFileName;
    }

    if (okExporterResult.kind === 'gaf') {
      if (exportFileName === null) {
        return 'new.gaf';
      }

      throw new Error(`'gaf' kind cannot have a exportFileName of type pair`);
    }

    if (okExporterResult.kind === 'taf-solo') {
      if (exportFileName === null) {
        const ext = okExporterResult.subFormat === 'taf_1555' ? '_1555.taf' : '_4444.taf';
        return 'new' + ext;
      }

      throw new Error(`'taf-solo' kind cannot have a exportFileName of type pair`);
    }

    if (target === undefined) {
      throw new Error(`'taf-pair' kind should have an export target`);
    }

    if (exportFileName === null) {
      return target === '1555' ? 'new_1555.taf' : 'new_4444.taf';
    }

    return exportFileName[target];
  }
}
