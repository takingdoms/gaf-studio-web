import { ModalController } from '@/components/ui/modal/ModalContext';
import ModalColorPromptBody from '@/components/ui/modal/helpers/ModalColorPromptBody';
import { ColorRgba } from '@/lib/utils/utility-types';
import React from 'react';

export type ModalColorPromptOptions = {
  title: string;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
  label: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  defaultColor: ColorRgba; // alpha is ignored when enableAlpha === false
  enableAlpha: boolean;
};

export type ModalColorPromptResult =  ColorRgba | null;

export type ModalColorPrompt = (options: ModalColorPromptOptions) => Promise<ModalColorPromptResult>;

export const makeModalColorPrompt: (modal: ModalController) => ModalColorPrompt = (modal) => {
  return (options) => {
    let resolved = false;

    return new Promise((resolve) => {
      const { hasClosed, close } = modal.pushModal({
        disableBackgroundClose: options.disableBackgroundClose,
        disableXClose: options.disableXClose,
        title: options.title,
        body: (
          <ModalColorPromptBody
            label={options.label}
            confirmLabel={options.confirmLabel}
            cancelLabel={options.cancelLabel}
            defaultColor={options.defaultColor}
            enableAlpha={options.enableAlpha}
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
