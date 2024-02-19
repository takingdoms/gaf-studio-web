import PreludeButton from '@/components/app/prelude/PreludeButton';
import PreludeChooseFileInput from '@/components/app/prelude/PreludeChooseFileInput';
import { Workspace } from '@/lib/gaf-studio/state/workspace';
import React from 'react';

type PreludeChooseFileTafPairProps = {
  onInit: (workspace: Workspace) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export default function PreludeChooseFileTafPair({
  onInit,
  isLoading,
  setIsLoading,
}: PreludeChooseFileTafPairProps) {
  const [file1555, setFile1555] = React.useState<File>();
  const [file4444, setFile4444] = React.useState<File>();

  const doLoad = React.useCallback(() => {
    if (isLoading) {
      return;
    }

    let promise: Promise<Workspace>;

    if (file1555 && file4444) {
      promise = Workspace.initFromTafPair(file1555, file4444);
    }
    else if (file1555) {
      promise = Workspace.initFromTafFile(file1555);
    }
    else if (file4444) {
      promise = Workspace.initFromTafFile(file4444);
    }
    else {
      return;
    }

    setIsLoading(true);

    promise
      .then(onInit)
      .catch((err) => {
        // TODO handle err
        console.error(err);
        setIsLoading(false);
      });
  }, [file1555, file4444, isLoading, setIsLoading, onInit]);

  return (<>
    <div className="grow flex flex-col">
      <PreludeChooseFileInput
        subFormat="taf_1555"
        file={file1555}
        setFile={setFile1555}
      />
      <PreludeChooseFileInput
        subFormat="taf_4444"
        file={file4444}
        setFile={setFile4444}
      />
      <PreludeButton
        onClick={doLoad}
        disabled={isLoading || (file1555 === undefined && file4444 === undefined)}
      >
        Load
      </PreludeButton>
    </div>
  </>);
}
