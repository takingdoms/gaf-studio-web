import React from 'react';

type FileDropzoneProps = {
  onChoose: (files: File[]) => void;
  label?: string;
  accept?: string;
} & (
  {
    defaultStyling?: never;
    className: string;
  }
  |
  {
    defaultStyling: true;
    className?: never;
  }
);

const DEFAULT_CLS = 'flex justify-center items-center bg-blue-50 text-slate-600 border-2'
  + ' border-dashed border-gray-400 cursor-pointer hover:text-sky-600 hover:bg-blue-100'
  + ' hover:border-sky-400 transition-colors text-center min-h-44';

export default function FileDropzone({ onChoose, className, accept }: FileDropzoneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const result = [...files];
    onChoose(result);
  }, [onChoose]);

  return (<>
    <div
      ref={containerRef}
      onClick={(ev) => {
        ev.preventDefault();
        if (fileInputRef.current !== null) {
          fileInputRef.current.click();
        }
      }}
      className={className ?? DEFAULT_CLS}
    >
      Click here or drag'n'drop files here
    </div>
    <input
      ref={fileInputRef}
      type="file"
      multiple
      style={{ display: 'none' }}
      accept={accept}
      onChange={onChange}
    />
  </>);
}
