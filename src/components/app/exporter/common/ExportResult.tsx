import ExportDownloadButtons from '@/components/app/exporter/common/ExportDownloadButtons';
import ExportNonFatalErrors from '@/components/app/exporter/common/ExportNonFatalErrors';
import { DownloadTarget } from '@/components/app/exporter/common/ExportWizard';
import { BuildExportResult } from '@/lib/exporting/build-exporter';
import { MainFormat } from '@/lib/main-format';
import { Icons } from '@/lib/react/icons';

type ExportResultProps<T extends MainFormat> = {
  exporterResult: BuildExportResult<T>;
  onDownload: (target: DownloadTarget) => void;
};

export default function ExportResult<T extends MainFormat>({
  exporterResult,
  onDownload,
}: ExportResultProps<T>) {
  const plural = exporterResult.kind === 'taf-pair';
  let msg: string;

  if (exporterResult.nonFatalErrors.length === 0) {
    msg = plural
      ? `If the downloads doesn't start automatically, try the links below:` // plural
      : `If the download doesn't start automatically, try the link below:`;
  }
  else {
    msg = `The ${plural ? 'downloads' : 'download'} didn't start automatically because`
      + ` warnings were generated when exporting. Please review the warnings and then click the`
      + ` ${plural ? 'download links' : 'download link'} below if you want to ignore them:`;
  }

  return (
    <div className="flex flex-col space-y-4">
      {exporterResult.nonFatalErrors.length > 0 && (
        <div className="border-b border-slate-200 pb-4">
          <div className="mb-2">
            <div className="text-xs font-bold mb-0.5">
              Some non-fatal errors have occurred.
            </div>
            <div className="text-sm" style={{ maxWidth: 600 }}>
              While you can still export your result, it's highly recommended to fix these warnings
              and try to export again (specially if there are high-severity warnings).
            </div>
          </div>
          <ExportNonFatalErrors errors={exporterResult.nonFatalErrors} />
        </div>
      )}

      <div>
        <div className="mb-2">
          <div className="flex items-center text-emerald-700">
            <Icons.CircleCheck className="mr-1.5" />
            <div className="font-bold">Your file is ready!</div>
          </div>
          <div className="text-sm" style={{ maxWidth: 600 }}>
            {msg}
          </div>
        </div>

        <ExportDownloadButtons
          result={exporterResult}
          onDownload={onDownload}
        />
      </div>
    </div>
  );
}
