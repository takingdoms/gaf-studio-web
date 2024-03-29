import PreludeFileChooser from '@/components/app/prelude/common-ui/PreludeFileChooser';
import PreludeInitErrorModal from '@/components/app/prelude/common-ui/PreludeInitErrorModal';
import SolidButton from '@/components/ui/button/SolidButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { TafSubFormat } from '@/lib/main-format';
import { Icons } from '@/lib/react/icons';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import { WorkspaceStateInitializer } from '@/lib/workspace-state-initializer/workspace-state-initializer';
import React from 'react';

type PreludeTafSoloFormModalProps = {
  isLoading: boolean;
  onInit: (configWrapper: WorkspaceConfigWrapper) => void;
  close: () => void;
};

export default function PreludeTafSoloFormModal({
  isLoading,
  onInit,
  close,
}: PreludeTafSoloFormModalProps) {
  const [understood, setUnderstood] = React.useState(false);

  const modal = React.useContext(ModalContext);

  const onLoadFile = React.useCallback((file: File) => {
    if (isLoading) {
      return;
    }

    const manualSubFormat: TafSubFormat | undefined = undefined; // one day?

    WorkspaceStateInitializer.initFromFileTafSolo(file, manualSubFormat)
      .then((result) => {
        if (result.kind === 'success') {
          onInit(result.configWrapper);
          return;
        }

        const { close: closeSub } = modal.pushModal({
          title: 'Error when initializing individual TAF',
          titleColor: 'error',
          body: (
            <PreludeInitErrorModal
              format="taf-solo"
              error={result}
              close={() => closeSub()}
            />
          ),
        });
      })
      .catch((err) => {
        console.error(err);
        alert(`Errored when loading taf.`);
      });
  }, [isLoading, onInit, modal]);

  const mainContent = understood ? (
    <div>
      <PreludeFileChooser
        setFile={onLoadFile}
        disabled={isLoading}
        accept=".taf"
      />
    </div>
  ) : (
    <SolidButton
      color="danger"
      onClick={() => setUnderstood(true)}
    >
      I understand
    </SolidButton>
  )

  return (
    <ModalPadding>
      <div className="flex flex-col">
        <div className="self-stretch flex justify-center mb-2">
          <Icons.Warning className="text-red-400" size={64} />
        </div>

        <div className="mb-4 text-center">
          <p>Warning! Avoid using this option unless you know what you are doing.</p>
          <p>
            Editing an individual TAF on its own might cause it to become <b>out of sync</b> with its pair,
            <br />which would potentially render it unusable.
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          {mainContent}
          <SolidButton onClick={close}>
            Cancel
          </SolidButton>
        </div>
      </div>
    </ModalPadding>
  );
}
