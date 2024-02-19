import PreludeButton from '@/components/app/prelude/PreludeButton';
import { Workspace } from '@/lib/gaf-studio/state/workspace';
import React from 'react';

type PreludeChooseFileSingleProps = {
  format: 'gaf' | 'taf' | 'auto';
  onInit: (workspace: Workspace) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export default function PreludeChooseFileSingle({
  format,
  onInit,
  isLoading,
  setIsLoading,
}: PreludeChooseFileSingleProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const selectInputFile = React.useCallback(() => {
    if (!isLoading && inputFileRef.current !== null) {
      inputFileRef.current.click();
    }
  }, [isLoading]);

  const onChangeInputFile = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      return;
    }

    ev.preventDefault();

    const files = ev.currentTarget.files;

    if (files === null || files.length === 0) {
      return;
    }

    setIsLoading(true);

    const promise
      = format === 'gaf' ? Workspace.initFromGafFile(files[0])
      : format === 'taf' ? Workspace.initFromTafFile(files[0])
      : Workspace.initFromAnyFile(files[0]);

    promise
      .then(onInit)
      .catch((err) => {
        // TODO handle err
        console.error(err);
        setIsLoading(false);
      });
  }, [isLoading, setIsLoading, onInit, format]);

  return (<>
    <div className="grow flex flex-col">
      <PreludeButton onClick={selectInputFile}>
        {
          format === 'gaf' ? 'Select GAF file' :
          format === 'taf' ? 'Select TAF file' :
          'Select file'
        }
      </PreludeButton>
    </div>
    <input
      ref={inputFileRef}
      type="file"
      style={{ display: 'none' }}
      onChange={onChangeInputFile}
      accept={
        format === 'gaf' ? '.gaf' :
        format === 'taf' ? '.taf' :
        '.gaf, .taf'
      }
    />
  </>);
}
