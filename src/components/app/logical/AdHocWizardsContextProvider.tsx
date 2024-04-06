import ConvertFrameToMultiModal from '@/components/app/converter/ConvertFrameToMultiModal';
import ConvertFrameToSingleModal from '@/components/app/converter/ConvertFrameToSingleModal';
import DeleteFrameModal from '@/components/app/deleter/DeleteFrameModal';
import DeleteSubframeModal from '@/components/app/deleter/DeleteSubframeModal';
import CreateEntryModal from '@/components/app/entry/CreateEntryModal';
import DeleteEntryModal from '@/components/app/entry/DeleteEntryModal';
import RenameEntryModal from '@/components/app/entry/RenameEntryModal';
import ImportModal from '@/components/app/importer/ImportModal';
import ReplaceModal from '@/components/app/importer/ReplaceModal';
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

  const createEntry = () => {
    const { close } = modal.pushModal({
      title: 'Create Sequence',
      body: <CreateEntryModal close={() => close()} />,
    });
  };

  const renameActiveEntry = (oldName?: string) => {
    const { close } = modal.pushModal({
      title: 'Rename Sequence',
      body: <RenameEntryModal close={() => close()} />,
    });
  };

  const deleteActiveEntry = () => {
    const { close } = modal.pushModal({
      title: 'Delete Sequence',
      body: <DeleteEntryModal close={() => close()} />,
    });
  };

  const replaceActiveFrameData = () => {
    const { close } = modal.pushModal({
      title: 'Replace Active Image Data',
      body: <ReplaceModal close={() => close()} />,
      disableBackgroundClose: true,
    });
  };

  const adHocWizards: AdHocWizards = {
    importImages,
    convertToMulti,
    convertToSingle,
    deleteFrame,
    deleteSubframe,
    changeFrameDuration,
    createEntry,
    renameActiveEntry,
    deleteActiveEntry,
    replaceActiveFrameData,
  };

  return (
    <AdHocWizardsContext.Provider value={adHocWizards}>
      {children}
    </AdHocWizardsContext.Provider>
  );
}
