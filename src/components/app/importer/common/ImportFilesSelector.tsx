import ImportBackground from '@/components/app/importer/common/ImportBackground';
import ImportContent from '@/components/app/importer/common/ImportContent';
import SolidButton from '@/components/ui/button/SolidButton';
import FileDropzone from '@/components/ui/file-dropzone/FileDropzone';

type ImportFilesSelectorProps = {
  isReplacing: boolean; // when true, only allows 1 file to be selected
  onFinish: (files: File[]) => void;
  onAbort: () => void;
  acceptFiles?: string;
};

export default function ImportFilesSelector({
  onFinish,
  onAbort,
  acceptFiles,
  isReplacing,
}: ImportFilesSelectorProps) {
  return (
    <ImportBackground>
      <ImportContent>
        {isReplacing ? (
          <FileDropzone
            defaultStyling
            multi={false}
            onChoose={(file) => onFinish([file])}
            accept={acceptFiles}
          />
        ): (
          <FileDropzone
            defaultStyling
            multi={true}
            onChoose={onFinish}
            accept={acceptFiles}
          />
        )}
      </ImportContent>

      <div className="flex">
        <SolidButton onClick={onAbort}>
          Cancel
        </SolidButton>
      </div>
    </ImportBackground>
  );
}
