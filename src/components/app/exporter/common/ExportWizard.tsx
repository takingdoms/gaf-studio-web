import { ExportFileName } from '@/components/app/exporter/Export';
import ExportPrelude from '@/components/app/exporter/common/ExportPrelude';
import ExportResult from '@/components/app/exporter/common/ExportResult';
import ExportResultFatalError from '@/components/app/exporter/common/ExportResultFatalError';
import { ExportUtils } from '@/components/app/exporter/common/export-utils';
import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { DownloadUtils } from '@/lib/downloading/download-utils';
import { BuildExportResult, BuildExporter } from '@/lib/exporting/build-exporter';
import { WRITE_RESULT_PAIR, WRITE_RESULT_SINGLE, WriterError, WriterResult } from '@/lib/exporting/gaf-writer';
import { ValidatorFatalError } from '@/lib/exporting/validator/build-validator';
import { MainFormat } from '@/lib/main-format';
import { AsyncUtils } from '@/lib/utils/async-utils';
import { Result } from '@/lib/utils/result';
import { VirtualGaf } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ExportWizardProps<T extends MainFormat = MainFormat> = {
  exportFileName: ExportFileName;
  virtualGaf: VirtualGaf<T>;
  exporter: BuildExporter<T>;
  onAbort: () => void;
};

// solo is used when MainFormat is 'taf-solo' or 'gaf'; the other 2 are only for 'taf-pair'
export type DownloadTarget = 'solo' | '1555' | '4444';

type DownloadableCache = Partial<Record<DownloadTarget, DownloadUtils.Downloadable>>;

// TODO eventually refactor this into 3 different components: for taf-solo, taf-pair and gaf kinds
// Even if the code ends up being largely redundant, it should make things less error-prone and,
// most importantly, easier to reason about
export default function ExportWizard<T extends MainFormat>({
  exportFileName,
  virtualGaf,
  exporter,
  onAbort,
}: ExportWizardProps<T>) {
  const [exporterResult, setExporterResult] = React.useState<Result<BuildExportResult<T>, ValidatorFatalError>>();
  const [writerResult, setWriterResult] = React.useState<Result<WriterResult<T>, WriterError>>();
  const [isExporting, setIsExporting] = React.useState(false);
  const [downloadableCache, setDownloadableCache] = React.useState<DownloadableCache>({});

  React.useEffect(() => {
    return () => {
      const downloadables = Object.values(downloadableCache);

      console.log(`Revoking downloadables... (${downloadables.length})`);

      for (const downloadable of downloadables) {
        downloadable.revoke();
      }
    };
  });

  const doDownloadBuffer = React.useCallback((
    buffer: Uint8Array,
    fileName: string,
    target: DownloadTarget,
  ) => {
    let downloadable = downloadableCache[target];

    if (downloadable === undefined) {
      console.log(`Caching downloadable now for: ${fileName}`);

      downloadable = DownloadUtils.createDownloadable(buffer, fileName);

      setDownloadableCache((prevCache) => ({
        ...prevCache,
        [target]: downloadable,
      }));
    }

    downloadable.download();
  }, [downloadableCache]);

  const doDownload = React.useCallback((
    okExporterResult: BuildExportResult<T>,
    okWriterResult: WriterResult<T>,
    target: DownloadTarget | null,
  ) => {
    if (okWriterResult.kind === 'single') {
      if (target !== null && target !== 'solo') {
        throw new Error(`This should not be possible.`);
      }

      const { buffer } = okWriterResult;
      const fileName = ExportUtils.getFileNameFor(exportFileName, okExporterResult);

      doDownloadBuffer(buffer, fileName, 'solo');
    }
    else {
      if (target === 'solo') {
        throw new Error(`This should not be possible.`);
      }

      if (target === '1555' || target === null) {
        const buffer = okWriterResult.buffer1555;
        const fileName = ExportUtils.getFileNameFor(exportFileName, okExporterResult, '1555');
        doDownloadBuffer(buffer, fileName, '1555');
      }

      if (target === '4444' || target === null) {
        const buffer = okWriterResult.buffer4444;
        const fileName = ExportUtils.getFileNameFor(exportFileName, okExporterResult, '4444');
        doDownloadBuffer(buffer, fileName, '4444');
      }
    }
  }, [doDownloadBuffer, exportFileName]);

  /// null = download both (when taf-pair) or the only one (when taf-solo or gaf)
  const onClickDownload = React.useCallback((target: DownloadTarget | null) => {
    if (exporterResult === undefined || exporterResult.kind === 'err') {
      console.error(exporterResult?.error);
      throw new Error(`Cannot download.`);
    }

    if (writerResult === undefined || writerResult.kind === 'err') {
      console.error(writerResult?.error);
      throw new Error(`Cannot download.`);
    }

    doDownload(exporterResult.result, writerResult.result, target);
  }, [exporterResult, writerResult, doDownload]);

  const doWrite = React.useCallback((exporterResult: BuildExportResult<T>) => {
    const writePromise = AsyncUtils.defer(async () => {
      if (exporterResult.kind === 'taf-pair') {
        const { taf1555, taf4444 } = exporterResult;
        return WRITE_RESULT_PAIR(taf1555, taf4444);
      }

      const gaf = exporterResult.kind === 'gaf' ? exporterResult.gaf : exporterResult.taf;
      return WRITE_RESULT_SINGLE(gaf);
    });

    writePromise
      .then((result) => {
        if (result.kind === 'err') {
          setWriterResult(result);
          return;
        }

        const actualWriterResult = result.result as WriterResult<T>;

        setWriterResult({
          kind: 'ok',
          result: actualWriterResult,
        });

        if (exporterResult.nonFatalErrors.length === 0) {
          doDownload(exporterResult, actualWriterResult, null);
        }
      })
      .catch((err) => {
        alert(`Unexpected error.`); // TODO put inside a toaster maybe
        console.error(err);
        onAbort();
      });
  }, [onAbort, doDownload]);

  const doExport = React.useCallback(() => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    AsyncUtils.defer(async () => exporter.export(virtualGaf))
      .then((result) => {
        setIsExporting(false);
        setExporterResult(result);

        if (result.kind === 'ok') {
          doWrite(result.result);
        }
      })
      .catch((err) => {
        alert(`Unexpected error.`); // TODO put inside a toaster maybe
        console.error(err);
        onAbort();
      });
  }, [isExporting, virtualGaf, exporter, onAbort, doWrite]);

  if (exporterResult === undefined) {
    return (
      <ExportPrelude
        onNext={doExport}
        onAbort={onAbort}
      />
    );
  }

  if (isExporting) {
    return (
      <ModalPadding>
        Exporting...
      </ModalPadding>
    );
  }

  if (exporterResult.kind === 'err') {
    return (
      <ImportBackground>
        <ImportContent>
          <ExportResultFatalError
            error={exporterResult.error}
            onAbort={onAbort}
          />
        </ImportContent>
      </ImportBackground>
    );
  }

  if (writerResult === undefined) {
    return (
      <ModalPadding>
        Writing buffer with LibGaf...
      </ModalPadding>
    );
  }

  if (writerResult.kind === 'err') {
    return (
      <ModalPadding>
        <div className="mb-1">An error occured while writing the file(s) buffer(s) using LibGaf.</div>
        <div className="text-xs font-mono">
          {writerResult.error.errorMsg}
        </div>
      </ModalPadding>
    );
  }

  return (
    <ImportBackground>
      <ImportContent>
        <ExportResult
          exporterResult={exporterResult.result}
          onDownload={onClickDownload}
        />
      </ImportContent>
    </ImportBackground>
  );
}
