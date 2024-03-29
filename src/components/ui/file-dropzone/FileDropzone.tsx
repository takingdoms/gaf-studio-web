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

  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const files = ev.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const result = [...files];

    if (multi) {
      onChoose(result);
    } else {
      onChoose(result[0])
    }
  }, [multi, onChoose, disabled]);

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
