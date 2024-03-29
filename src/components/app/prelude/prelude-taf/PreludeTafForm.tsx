import PreludeArrowDown from '@/components/app/prelude/common-ui/PreludeArrowDown';
import PreludeFileChooser from '@/components/app/prelude/common-ui/PreludeFileChooser';
import PreludeHeader from '@/components/app/prelude/common-ui/PreludeHeader';
import PreludeInitErrorModal from '@/components/app/prelude/common-ui/PreludeInitErrorModal';
import PreludePlus from '@/components/app/prelude/common-ui/PreludePlus';
import PreludeStep, { PreludeStepStatus } from '@/components/app/prelude/common-ui/PreludeStep';
import PreludeSubtitle from '@/components/app/prelude/common-ui/PreludeSubtitle';
import SolidButton from '@/components/ui/button/SolidButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import { WorkspaceStateInitializer } from '@/lib/workspace-state-initializer/workspace-state-initializer';
import React from 'react';

type PreludeTafFormProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onInit: (configWrapper: WorkspaceConfigWrapper) => void;
};

export default function PreludeTafForm({
  isLoading,
  setIsLoading,
  onInit,
}: PreludeTafFormProps) {
  const [taf1555File, setTaf1555File] = React.useState<File>();
  const [taf4444File, setTaf4444File] = React.useState<File>();
  const [error1555, setError1555] = React.useState(false);
  const [error4444, setError4444] = React.useState(false);

  const modal = React.useContext(ModalContext);

  const onClickImport = React.useCallback(() => {
    if (isLoading || taf1555File === undefined || taf4444File === undefined) {
      return;
    }

    setError1555(false);
    setError4444(false);

    WorkspaceStateInitializer.initFromFileTafPair(taf1555File, taf4444File)
      .then((result) => {
        if (result.kind === 'success') {
          onInit(result.configWrapper);
          return;
        }

        const { close } = modal.pushModal({
          title: 'Error when initializing TAF Pair',
          titleColor: 'error',
          body: (
            <PreludeInitErrorModal
              format="taf-pair"
              error={result}
              close={() => close()}
            />
          ),
        });

        if ('which' in result && result['which'] !== undefined) {
          if (result.which === 'taf_1555') setError1555(true);
          if (result.which === 'taf_4444') setError4444(true);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(`Errored when loading tafs.`);
      });
  }, [isLoading, taf1555File, taf4444File, onInit, modal, setIsLoading]);

  const status1555: PreludeStepStatus = taf1555File === undefined ? 'empty'
    : error1555 ? 'err'
    : 'ok';

  const status4444: PreludeStepStatus = taf4444File === undefined ? 'empty'
    : error4444 ? 'err'
    : 'ok';

  return (
    <div className="flex flex-col items-center">
      <PreludeHeader>TAF Mode</PreludeHeader>

      <PreludeSubtitle>
        Select a pair of matching TAF files.
      </PreludeSubtitle>

      <PreludeStep
        label="Choose _1555.taf file"
        status={status1555}
      />
      <PreludeFileChooser
        file={taf1555File}
        setFile={(file) => {
          setError1555(false);
          setTaf1555File(file);
        }}
        accept=".taf"
      />

      <PreludePlus />

      <PreludeStep
        label="Choose _4444.taf file"
        status={status4444}
      />
      <PreludeFileChooser
        file={taf4444File}
        setFile={(file) => {
          setError4444(false);
          setTaf4444File(file);
        }}
        accept=".taf"
      />

      <PreludeArrowDown />

      <SolidButton
        disabled={isLoading || taf1555File === undefined || taf4444File === undefined}
        onClick={onClickImport}
      >
        Import
      </SolidButton>
    </div>
  );
}
