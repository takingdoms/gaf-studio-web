import ModalConfigContent from '@/components/ui/modal/ModalConfigContent';
import { ModalController, ModalConfig } from '@/components/ui/modal/ModalContext';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import React from 'react';
import { createPortal } from "react-dom";

type ModalPortalProps = {
  controllerRef: React.MutableRefObject<ModalController | null>;
};

type ModalConfigWrapper = {
  config: ModalConfig;
  onClosed: () => void;
};

export default function ModalPortal({ controllerRef }: ModalPortalProps) {
  const [stack, setStack] = React.useState<ModalConfigWrapper[]>([]);

  const removeModal = React.useCallback((modalConfig: ModalConfig) => {
    setStack((wrapperStack) => {
      return wrapperStack.filter((wrapper) => {
        if (wrapper.config === modalConfig) {
          wrapper.onClosed();
          return false;
        }

        return true;
      });
    });
  }, []);

  const pushModal: ModalController['pushModal'] = React.useCallback((modalConfig: ModalConfig) => {
    const closedPromise = new Promise<void>((resolve) => {
      const wrapper: ModalConfigWrapper = {
        config: modalConfig,
        onClosed: resolve,
      };

      setStack((modalStack) => {
        return [...modalStack, wrapper];
      });
    });

    return {
      close: () => removeModal(modalConfig),
      hasClosed: closedPromise,
    };
  }, [removeModal]);

  const popModal: ModalController['popModal'] = React.useCallback(() => {
    if (stack.length === 0) {
      return;
    }

    setStack(stack.slice(0, -1));
  }, [stack]);

  controllerRef.current = { pushModal, popModal };

  const modalStackContent = stack.map((configWrapper, index) => {
    const config = configWrapper.config;
    const close = () => removeModal(config);

    return (
      <ModalWrapper
        key={index}
        zOffset={index}
        close={config.disableBackgroundClose ? undefined : close}
      >
        <ModalConfigContent
          config={configWrapper.config}
          close={config.disableXClose ? undefined : close}
        />
      </ModalWrapper>
    );
  });

  return createPortal(modalStackContent, document.body);
}
