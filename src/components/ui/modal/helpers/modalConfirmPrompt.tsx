import { SolidButtonProps } from '@/components/ui/button/SolidButton';
import { ModalController } from '@/components/ui/modal/ModalContext';
import ModalConfirmPromptBody from "@/components/ui/modal/helpers/ModalConfirmPromptBody";
import React from 'react';

export type ModalConfirmPromptOptions = {
  title: string;
  text: React.ReactNode;
  confirmLabel?: string;
  rejectLabel?: string;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
  confirmColor?: SolidButtonProps['color'];
  rejectColor?: SolidButtonProps['color'];
};

export type ModalConfirmPromptResult = true | false | null; // yes | no | (closed)

export type ModalConfirmPrompt = (options: ModalConfirmPromptOptions) => Promise<ModalConfirmPromptResult>;

export const makeModalConfirmPrompt: (modal: ModalController) => ModalConfirmPrompt = (modal) => {
  return (options) => {
    let resolved = false;

    return new Promise((resolve) => {
      const { hasClosed, close } = modal.pushModal({
        disableBackgroundClose: options.disableBackgroundClose,
        disableXClose: options.disableXClose,
        title: options.title,
        body: (
          <ModalConfirmPromptBody
            confirmLabel={options.confirmLabel ?? 'Yes'}
            rejectLabel={options.rejectLabel ?? 'No'}
            confirmColor={options.confirmColor}
            rejectColor={options.rejectColor}
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
  };
};
