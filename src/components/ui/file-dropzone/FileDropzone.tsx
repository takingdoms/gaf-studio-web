import React from 'react';

export type FileDropzoneState = {
  hasFile: boolean;
  disabled: boolean;
};

type FileDropzoneProps = {
  currentFile?: File;
  label?: string;
  accept?: string;
  disabled?: boolean;
} & (
  {
    multi?: false;
    onChoose: (files: File) => void;
  }
  |
  {
    multi: true;
    onChoose: (files: File[]) => void;
  }
) & (
  {
    defaultStyling?: never;
    className: (state: FileDropzoneState) => string;
  }
  |
  {
    defaultStyling: true;
    className?: never;
  }
);

const DEFAULT_CLS = 'flex justify-center items-center bg-blue-50 text-slate-600 border-2'
  + ' border-dashed border-gray-400 cursor-pointer hover:text-sky-600 hover:bg-blue-100'
  + ' hover:border-sky-400 transition-colors text-center min-h-44 p-4';

export default function FileDropzone({
  currentFile,
  label,
  multi,
  onChoose,
  className,
  accept,
  disabled,
}: FileDropzoneProps) {
  label ??= `(Click here or drag'n'drop ${multi ? 'files' : 'a file'})`;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const files = ev.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const result = [...files];

    if (multi) {
      (onChoose as (files: File[]) => void)(result);
    } else {
      (onChoose as (file: File) => void)(result[0])
    }
  };

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();

    if (!disabled) {
      ev.dataTransfer.dropEffect = 'copy';
    }
  };

  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();

    if (!disabled) {
      const files = ev.dataTransfer.files;

      if (files.length > 0) {
        const fileList = Array.from(files);

        if (multi) {
          (onChoose as (files: File[]) => void)(fileList);
        } else {
          (onChoose as (file: File) => void)(fileList[0]);
        }
      }
    }
  };

  const cls = React.useMemo(() => {
    return className
      ? className({ hasFile: currentFile !== undefined, disabled: disabled ?? false })
      : DEFAULT_CLS;
  }, [className, currentFile, disabled]);

  return (<>
    <div
      ref={containerRef}
      onClick={(ev) => {
        ev.preventDefault();
        if (!disabled && fileInputRef.current !== null) {
          fileInputRef.current.click();
        }
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={cls}
    >
      {currentFile ? currentFile.name : label}
    </div>
    <input
      ref={fileInputRef}
      type="file"
      multiple={multi === true}
      style={{ display: 'none' }}
      accept={accept}
      onChange={onChange}
    />
  </>);
}
