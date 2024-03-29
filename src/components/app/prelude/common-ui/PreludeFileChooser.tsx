import IconButton from '@/components/ui/button/IconButton';
import FileDropzone, { FileDropzoneState } from '@/components/ui/file-dropzone/FileDropzone';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type PreludeFileChooserProps = {
  file?: File;
  setFile: (file: File) => void;
  disabled?: boolean;
  accept?: string;
  onRemove?: () => void;
};

export default function PreludeFileChooser({
  file,
  setFile,
  disabled,
  accept,
  onRemove,
}: PreludeFileChooserProps) {
  return (
    <div className="flex justify-center items-center space-x-1">
      <div className="grow">
        <FileDropzone
          currentFile={file}
          onChoose={setFile}
          className={React.useCallback(makeFileDropzoneCls, [])}
          disabled={disabled}
          accept={accept}
        />
      </div>
      {onRemove && file !== undefined && (
        <div className={`flex justify-center items-center leading-none`
          + ` ${file === undefined ? 'invisible' : ''}`}>
          <IconButton
            icon={Icons.Delete}
            size={30}
            onClick={onRemove}
            disabled={file === undefined}
          />
        </div>
      )}
    </div>
  );
}

const fileDropzoneBaseCls = 'min-w-[260px] flex justify-center items-center bg-slate-200 border'
  + ' border-dashed p-4';

function makeFileDropzoneCls(state: FileDropzoneState) {
  let cls = fileDropzoneBaseCls;

  if (state.hasFile) {
    cls += ' font-semibold border-emerald-500 text-emerald-600';
  }
  else {
    cls += ' font-normal border-slate-400 text-slate-500';
  }

  if (state.disabled) {
    cls += ' opacity-50';
  }
  else {
    cls += ' cursor-pointer hover:bg-blue-100 hover:text-sky-500 transition-colors';
  }

  return cls;
}
