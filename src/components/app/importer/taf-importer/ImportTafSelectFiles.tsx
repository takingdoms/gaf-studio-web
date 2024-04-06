import ImportFilesSelector from '@/components/app/importer/common/ImportFilesSelector';
import { ImageDecoder } from '@/lib/importing/image-decoder';
import React from 'react';

type ImportTafSelectFilesProps = {
  isReplacing: boolean;
  availableDecoders: readonly ImageDecoder[];
  onNext: (file: File[]) => void;
  onAbort: () => void;
};

export default function ImportTafSelectFiles({
  isReplacing,
  availableDecoders,
  onNext,
  onAbort,
}: ImportTafSelectFilesProps) {
  const acceptFiles = React.useMemo(() => {
    return availableDecoders
      .flatMap((dec) => dec.supportedFileExts)
      .map((ext) => `.${ext}`).join(',');
  }, [availableDecoders]);

  return (
    <ImportFilesSelector
      isReplacing={isReplacing}
      onFinish={onNext}
      acceptFiles={acceptFiles}
      onAbort={onAbort}
    />
  );
}
