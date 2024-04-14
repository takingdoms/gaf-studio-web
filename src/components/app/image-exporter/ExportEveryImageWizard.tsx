import SolidButton from '@/components/ui/button/SolidButton';
import TextButton from '@/components/ui/button/TextButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { DownloadUtils } from '@/lib/downloading/download-utils';
import { ImageExporter } from '@/lib/image-exporting/image-exporter';
import { Icons } from '@/lib/react/icons';
import { AsyncUtils } from '@/lib/utils/async-utils';
import React from 'react';

type ExportEveryImageWizardProps = {
  itemTreeWrapper: ImageExporter.ItemTreeWrapper;
  onAbort: () => void;
};

export default function ExportEveryImageWizard({
  itemTreeWrapper,
  onAbort,
}: ExportEveryImageWizardProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<DownloadUtils.Downloadable>();

  React.useEffect(() => {
    return () => {
      if (result !== undefined) {
        console.log(`Revoking downloadable...`);
        result.revoke();
      }
    };
  });

  const doDownload = React.useCallback((downloadable: DownloadUtils.Downloadable) => {
    downloadable.download();
  }, []);

  const doExport = React.useCallback(() => {
    setIsLoading(true);

    AsyncUtils.defer(() => ImageExporter.exportItemTreeWrapperAsDownloadableZip(itemTreeWrapper))
      .then((newResult) => {
        setResult(newResult);
        doDownload(newResult);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(`Unexpected error.`); // TODO put inside a toaster maybe
        console.error(err);
        onAbort();
      });
  }, [itemTreeWrapper, onAbort, doDownload]);

  if (isLoading) {
    return (
      <ModalPadding>
        Processing...
        <div className="text-sm text-slate-600">
          This can take a few seconds depending on the number of images.
        </div>
      </ModalPadding>
    );
  }

  if (result === undefined) {
    return (
      <ModalPadding>
        <div className="mb-4">
          Export all sequences as images?
        </div>

        <div className="flex justify-end space-x-2">
          <SolidButton
            color="success"
            onClick={() => doExport()}
          >
            Export
          </SolidButton>

          <SolidButton
            onClick={() => onAbort()}
          >
            Cancel
          </SolidButton>
        </div>
      </ModalPadding>
    );
  }

  return (
    <ModalPadding>
      <div className="flex items-center text-emerald-700 mb-4">
        <Icons.CircleCheck className="mr-1.5" />
        <div className="font-bold">Your file is ready!</div>
      </div>

      <div className="text-sm">
        If the download doesn't start automatically, try the link below:
      </div>

      <TextButton
        label={`Click to download the images`}
        onClick={() => doDownload(result)}
      />
    </ModalPadding>
  );
}
