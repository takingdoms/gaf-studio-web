import PreludeButton from '@/components/app/prelude/PreludeButton';
import PreludePaletteSelector from '@/components/app/prelude/PreludePaletteSelector';
import { CurrentPaletteFromCustomFile } from '@/lib/state/gaf-studio/current-palette';
import { PaletteStore } from '@/lib/state/gaf-studio/palette-store';
import { WorkspaceState } from '@/lib/state/gaf-studio/workspace-state';
import { WorkspaceStateUtils } from '@/lib/state/utils/workspace-state-utils';
import React from 'react';

type PreludeChooseFileSingleProps = {
  format: 'gaf' | 'taf' | 'auto';
  onInit: (workspaceState: WorkspaceState) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  paletteStore: PaletteStore;
};

export default function PreludeChooseFileSingle({
  format,
  onInit,
  isLoading,
  setIsLoading,
  paletteStore,
}: PreludeChooseFileSingleProps) {
  const [customPalette, setCustomPalette] = React.useState<CurrentPaletteFromCustomFile>();

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

    // TODO auto-detect palette at some point and under some condition
    const defaultPalette = customPalette ?? paletteStore.grayscale;

    const promise
      = format === 'gaf' ? WorkspaceStateUtils.initFromGafFile(files[0], defaultPalette)
      : format === 'taf' ? WorkspaceStateUtils.initFromTafFile(files[0])
      : WorkspaceStateUtils.initFromAnyFile(files[0], defaultPalette);

    promise
      .then(onInit)
      .catch((err) => {
        // TODO handle err
        console.error(err);
        setIsLoading(false);
      });
  }, [isLoading, setIsLoading, onInit, format, paletteStore, customPalette]);

  return (<>
    <div className="grow flex flex-col">
      {format === 'gaf' && (
        <div className="mb-2">
          <PreludePaletteSelector
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selected={customPalette}
            setSelected={setCustomPalette}
          />
        </div>
      )}

      <PreludeButton onClick={selectInputFile}>
        {
          format === 'gaf' ? 'Load GAF file' :
          format === 'taf' ? 'Load TAF file' :
          'Load file'
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
