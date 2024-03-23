import ImportModal from '@/components/app/importer/ImportModal';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { AdHocWizards, AdHocWizardsContext } from '@/lib/react/ad-hoc-wizards-context';
import React from 'react';

type AdHocWizardsContextProviderProps = {
  children: React.ReactNode;
};

export default function AdHocWizardsContextProvider({ children }: AdHocWizardsContextProviderProps) {
  const modal = React.useContext(ModalContext);

  const importImages: AdHocWizards['importImages'] = React.useCallback((type) => {
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
  }, [modal]);

  const adHocWizards: AdHocWizards = {
    importImages,
  };

  return (
    <AdHocWizardsContext.Provider value={adHocWizards}>
      {children}
    </AdHocWizardsContext.Provider>
  );
}
