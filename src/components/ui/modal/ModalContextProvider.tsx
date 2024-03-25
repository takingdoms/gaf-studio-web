import { ModalController, ModalConfig, ModalContext, ModalHelpers, ModalHelpersContext } from '@/components/ui/modal/ModalContext';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import { makeModalColorPrompt } from '@/components/ui/modal/helpers/modalColorPrompt';
import { makeModalConfirmPrompt } from "@/components/ui/modal/helpers/modalConfirmPrompt";
import { makeModalCustomPrompt } from "@/components/ui/modal/helpers/modalCustomPrompt";
import { makeModalNumberPrompt } from "@/components/ui/modal/helpers/modalNumberPrompt";
import React from 'react';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const controllerRef = React.useRef<ModalController>(null);

  const pushModal: ModalController['pushModal'] = React.useCallback((modalConfig: ModalConfig) => {
    if (controllerRef.current !== null) {
      return controllerRef.current.pushModal(modalConfig);
    }

    return {
      close: () => {},
      hasClosed: Promise.resolve(),
    };
  }, []);

  const popModal: ModalController['popModal'] = React.useCallback(() => {
    if (controllerRef.current !== null) {
      controllerRef.current.popModal();
    }
  }, []);

  const modalHelpers: ModalHelpers = React.useMemo(() => {
    const modal = { pushModal, popModal };

    return {
      confirmPrompt: makeModalConfirmPrompt(modal),
      customPrompt: makeModalCustomPrompt(modal),
      numberPrompt: makeModalNumberPrompt(modal),
      colorPrompt: makeModalColorPrompt(modal),
    };
  }, [pushModal, popModal]);

  return (<>
    <ModalContext.Provider value={{ pushModal, popModal }}>
      <ModalHelpersContext.Provider value={modalHelpers}>
        {children}
        <ModalPortal controllerRef={controllerRef} />
      </ModalHelpersContext.Provider>
    </ModalContext.Provider>
  </>);
}
