import TextButton from '@/components/ui/button/TextButton';
import { TafFormat } from '@/lib/gaf-studio/main-format';
import React from 'react';

type PreludeChooseFileInputProps = {
  subFormat: TafFormat;
  file: File | undefined;
  setFile: (file: File | undefined) => void;
};

export default function PreludeChooseFileInput({
  subFormat,
  file,
  setFile,
}: PreludeChooseFileInputProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="py-2">
      <table>
        <tbody>
          <tr>
            <td className="px-1">
              TAF {subFormat === 'taf_1555' ? '1555' : '4444'}:
            </td>
            <td className="px-1">
              <input
                ref={inputFileRef}
                type="file"
                accept=".taf"
                onChange={(ev) => {
                  const files = ev.currentTarget.files;
                  setFile(files && files.length > 0
                    ? files[0]
                    : undefined)
                }}
              />
            </td>
            <td className="px-1">
              <TextButton
                label="Remove"
                disabled={file === undefined}
                onClick={() => {
                  setFile(undefined);
                  if (inputFileRef.current) {
                    inputFileRef.current.value = '';
                  }
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
