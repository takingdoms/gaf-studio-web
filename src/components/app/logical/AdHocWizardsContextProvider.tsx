import ConvertFrameToMultiModal from '@/components/app/converter/ConvertFrameToMultiModal';
import ConvertFrameToSingleModal from '@/components/app/converter/ConvertFrameToSingleModal';
import DeleteFrameModal from '@/components/app/deleter/DeleteFrameModal';
import DeleteSubframeModal from '@/components/app/deleter/DeleteSubframeModal';
import ImportModal from '@/components/app/importer/ImportModal';
import ChangeFrameDurationModal from '@/components/app/other-modals/ChangeFrameDurationModal';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { AdHocWizards, AdHocWizardsContext } from '@/lib/react/ad-hoc-wizards-context';
import React from 'react';

type AdHocWizardsContextProviderProps = {
  children: React.ReactNode;
};

export default function AdHocWizardsContextProvider({ children }: AdHocWizardsContextProviderProps) {
  const modal = React.useContext(ModalContext);

  const importImages: AdHocWizards['importImages'] = (type) => {
    const { close } = modal.pushModal({
      title: 'Import Images Wizard',
      disableBackgroundClose: true,
      body: (
        <ImportModal
          type={type}
          close={() => close()}
        />
      ),
    });
  };

  const convertToMulti = () => {
    const { close } = modal.pushModal({
      title: 'Convert Selected Frame to Multi-layered',
      body: <ConvertFrameToMultiModal close={() => close()} />,
    });
  };

  const convertToSingle = () => {
    const { close } = modal.pushModal({
      title: 'Convert Selected Frame to Single-layered',
      body: <ConvertFrameToSingleModal close={() => close()} />,
    });
  };

  const deleteFrame = () => {
    const { close } = modal.pushModal({
      title: 'Delete Selected Frame',
      body: <DeleteFrameModal close={() => close()} />,
    });
  };

  const deleteSubframe = () => {
    const { close } = modal.pushModal({
      title: 'Delete Selected Subframe',
      body: <DeleteSubframeModal close={() => close()} />,
    });
  };

  const changeFrameDuration = (applyToAll: boolean) => {
    const title = applyToAll
      ? 'Change frame duration of every Frame of the active Sequence'
      : 'Change frame duration of the active Frame';

    const { close } = modal.pushModal({
      title,
      body: (
        <ChangeFrameDurationModal
          applyToAll={applyToAll}
          close={() => close()}
        />
      ),
    });
  };

  const adHocWizards: AdHocWizards = {
    importImages,
    convertToMulti,
    convertToSingle,
    deleteFrame,
    deleteSubframe,
    changeFrameDuration,
  };

  return (
    <AdHocWizardsContext.Provider value={adHocWizards}>
      {children}
    </AdHocWizardsContext.Provider>
  );
}
