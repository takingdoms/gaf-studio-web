import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import SolidButton from '@/components/ui/button/SolidButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';

type ImportFilesSelectorProps = {
  onFinish: (files: File[]) => void;
  onAbort: () => void;
  acceptFiles?: string;
};

export default function ImportFilesSelector({ onFinish, onAbort, acceptFiles }: ImportFilesSelectorProps) {
  return (
    <ImportBackground>
      <ImportContent>
        <FileDropzone
          defaultStyling
          onChoose={onFinish}
          accept={acceptFiles}
        />
      </ImportContent>

      <div className="flex">
        <SolidButton onClick={onAbort}>
          Cancel
        </SolidButton>
      </div>
    </ImportBackground>
  );
}
