import PreludeArrowDown from '@/components/app/prelude/common-ui/PreludeArrowDown';
import PreludeFileChooser from '@/components/app/prelude/common-ui/PreludeFileChooser';
import PreludeHeader from '@/components/app/prelude/common-ui/PreludeHeader';
import PreludePlus from '@/components/app/prelude/common-ui/PreludePlus';
import PreludeStep, { PreludeStepStatus } from '@/components/app/prelude/common-ui/PreludeStep';
import PreludeSubtitle from '@/components/app/prelude/common-ui/PreludeSubtitle';
import PreludeInitErrorModal from '@/components/app/prelude/common-ui/PreludeInitErrorModal';
import PreludeGafPaletteForm from '@/components/app/prelude/prelude-gaf/PreludeGafPaletteForm';
import SolidButton from '@/components/ui/button/SolidButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { PaletteStore } from '@/lib/state/gaf-studio/palette-store';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import { Result } from '@/lib/utils/result';
import { WorkspaceStateInitializer } from '@/lib/workspace-state-initializer/workspace-state-initializer';
import React from 'react';

type PreludeGafFormProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onInit: (configWrapper: WorkspaceConfigWrapper) => void;
  paletteStore: PaletteStore;
};

export type PaletteSelectionMode = 'pre-selectable' | 'user-file';

export default function PreludeGafForm({
  isLoading,
  setIsLoading,
  onInit,
  paletteStore,
}: PreludeGafFormProps) {
  const [gafFile, setGafFile] = React.useState<File>();
  const [palMode, setPalMode] = React.useState<PaletteSelectionMode>('pre-selectable');
  const [currentPal, setCurrentPal] = React.useState<Result<CurrentPalette, string> | undefined>({
    kind: 'ok',
    result: paletteStore.default,
  });

  const modal = React.useContext(ModalContext);

  const onClickImport = React.useCallback(() => {
    if (isLoading || gafFile === undefined || currentPal === undefined || currentPal.kind !== 'ok') {
      return;
    }

    setIsLoading(true);

    WorkspaceStateInitializer.initFromFileGaf(gafFile, currentPal.result)
      .then((result) => {
        if (result.kind === 'success') {
          onInit(result.configWrapper);
          return;
        }

        const { close } = modal.pushModal({
          title: 'Error when initializing GAF',
          titleColor: 'error',
          body: (
            <PreludeInitErrorModal
              format="gaf"
              error={result}
              close={() => close()}
            />
          ),
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(`Errored when loading gaf.`);
      });
  }, [gafFile, currentPal, onInit, isLoading, setIsLoading, modal]);

  let palStepStatus: PreludeStepStatus = 'empty';
  if (currentPal !== undefined) {
    palStepStatus = currentPal.kind;
  }

  return (
    <div className="flex flex-col items-center">
      <PreludeHeader>GAF Mode</PreludeHeader>

      <PreludeSubtitle>
        Select a GAF file and the palette that it will use.
      </PreludeSubtitle>

      <PreludeStep
        label="Choose .gaf file"
        status={gafFile === undefined ? 'empty' : 'ok'}
      />
      <PreludeFileChooser
        file={gafFile}
        setFile={setGafFile}
        accept=".gaf"
      />

      <PreludePlus />

      <PreludeStep
        label="Choose palette"
        status={palStepStatus}
      />
      <PreludeGafPaletteForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        paletteStore={paletteStore}
        palMode={palMode}
        setPalMode={setPalMode}
        currentPal={currentPal}
        setCurrentPal={setCurrentPal}
      />

      <PreludeArrowDown />

      <SolidButton
        disabled={isLoading || gafFile === undefined || palStepStatus !== 'ok'}
        onClick={onClickImport}
      >
        Import
      </SolidButton>
    </div>
  );
}
