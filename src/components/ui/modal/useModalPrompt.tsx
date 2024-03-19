import { ModalContext } from '@/components/ui/modal/ModalContext';
import ModalPromptBody from '@/components/ui/modal/ModalPromptBody';
import React from 'react';

export type ModalPromptOptions = {
  title: string;
  text: React.ReactNode;
  confirmLabel?: string;
  rejectLabel?: string;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
};

export type ModalPromptResult = true | false | null; // yes | no | (closed)

export type ModalPrompter = {
  showPrompt: (options: ModalPromptOptions) => Promise<ModalPromptResult>;
};

export default function useModalPrompt(): ModalPrompter {
  const modalContext = React.useContext(ModalContext);

  return React.useMemo(() => ({
    showPrompt: (options) => {
      let resolved = false;

      return new Promise((resolve) => {
        const { hasClosed, close } = modalContext.pushModal({
          disableBackgroundClose: options.disableBackgroundClose,
          disableXClose: options.disableXClose,
          title: options.title,
          body: (
            <ModalPromptBody
              confirmLabel="Yes"
              rejectLabel="No"
              text={options.text}
              resolve={(result) => {
                if (!resolved) {
                  resolved = true;
                  resolve(result);
                  close();
                }
              }}
            />
          ),
        });

        hasClosed.then(() => {
          if (!resolved) {
            resolved = true;
            resolve(null);
          }
        });
      });
    },
  }), [modalContext]);
}
