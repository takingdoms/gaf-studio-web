import PreludeChooseFileGafSingle from '@/components/app/prelude/PreludeChooseFileGafSingle';
import PreludeChooseFileTafPair from '@/components/app/prelude/PreludeChooseFileTafPair';
import Select from '@/components/ui/select/Select';
import { MainFormat } from '@/lib/gaf-studio/main-format';
import { WorkspaceState } from '@/lib/gaf-studio/state/workspace-state';
import React from 'react';

type PreludeChooseFileProps = {
  onInit: (workspaceState: WorkspaceState) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export default function PreludeChooseFile({
  onInit,
  isLoading,
  setIsLoading,
}: PreludeChooseFileProps) {
  const [format, setFormat] = React.useState<MainFormat | 'auto' | 'taf-pair'>('taf'); // TODO change to auto

  return (
    <div className="grow flex flex-col space-y-2">
      <div className="flex items-center">
        <span className="mr-1.5">Format:</span>
        <Select<MainFormat | 'auto' | 'taf-pair'>
          value={format}
          onChange={setFormat}
          options={[
            { id: 'auto', label: 'Auto-detect' },
            { id: 'gaf', label: 'GAF' },
            { id: 'taf', label: 'TAF (any)' },
            { id: 'taf-pair', label: 'TAF (pair)' },
          ]}
        />
      </div>

      {format === 'taf-pair' ? (
        <PreludeChooseFileTafPair
          onInit={onInit}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <PreludeChooseFileGafSingle
          format={format}
          onInit={onInit}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
