import { DownloadTarget } from '@/components/app/exporter/common/ExportWizard';
import TextButton from '@/components/ui/button/TextButton';
import { BuildExportResult } from '@/lib/exporting/build-exporter';
import { MainFormat, TafSubFormat } from '@/lib/main-format';

type ExportDownloadButtonsProps<T extends MainFormat> = {
  result: BuildExportResult<T>;
  onDownload: (target: DownloadTarget) => void;
};

export default function ExportDownloadButtons<T extends MainFormat>({
  result,
  onDownload,
}: ExportDownloadButtonsProps<T>) {
  if (result.kind === 'taf-pair') {
    return (
      <div className="flex flex-col items-start space-y-2">
        <TextButton
          label={`Click to download the TAF 1555 file`}
          onClick={() => onDownload('1555')}
        />
        <TextButton
          label={`Click to download the TAF 4444 file`}
          onClick={() => onDownload('4444')}
        />
      </div>
    );
  }

  let fileType: string;

  if (result.kind === 'gaf') {
    fileType = 'GAF';
  } else {
    fileType = result.subFormat === 'taf_1555' ? 'TAF 1555' : 'TAF 4444';
  }

  return (
    <div>
      <TextButton
        label={`Click to download the ${fileType}`}
        onClick={() => onDownload('solo')}
      />
    </div>
  );
}

function tafSubFormatToExt(subFormat: TafSubFormat): string {
  return subFormat === 'taf_1555' ? '_1555.taf' : '_4444.taf';
}
