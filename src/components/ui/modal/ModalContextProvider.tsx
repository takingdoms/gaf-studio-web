import { ModalController, ModalConfig, ModalContext } from '@/components/ui/modal/ModalContext';
import ModalPortal from '@/components/ui/modal/ModalPortal';
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

  return (<>
    <ModalContext.Provider value={{ pushModal, popModal }}>
      {children}
    </ModalContext.Provider>
    <ModalPortal controllerRef={controllerRef} />
  </>);
}
