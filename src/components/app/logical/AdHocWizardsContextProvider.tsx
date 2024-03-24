import ConvertFrameToMultiModal from '@/components/app/converter/ConvertFrameToMultiModal';
import ConvertFrameToSingleModal from '@/components/app/converter/ConvertFrameToSingleModal';
import ImportModal from '@/components/app/importer/ImportModal';
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
      title: 'Convert Frame to Multi-layered',
      body: <ConvertFrameToMultiModal close={() => close()} />,
    });
  };

  const convertToSingle = () => {
    const { close } = modal.pushModal({
      title: 'Convert Frame to Single-layered',
      body: <ConvertFrameToSingleModal close={() => close()} />,
    });
  };

  const adHocWizards: AdHocWizards = {
    importImages,
    convertToMulti,
    convertToSingle,
  };

  return (
    <AdHocWizardsContext.Provider value={adHocWizards}>
      {children}
    </AdHocWizardsContext.Provider>
  );
}
