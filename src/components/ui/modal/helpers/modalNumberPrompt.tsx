import { ModalController } from '@/components/ui/modal/ModalContext';
import ModalNumberPromptBody from "@/components/ui/modal/helpers/ModalNumberPromptBody";
import React from 'react';

export type ModalNumberPromptOptions = {
  title: string;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
  label: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  min?: number;
  max?: number;
  isFloat?: boolean; // default = false
  defaultValue?: number;
};

export type ModalNumberPromptResult =  number | null;

export type ModalNumberPrompt = (options: ModalNumberPromptOptions) => Promise<ModalNumberPromptResult>;

export const makeModalNumberPrompt: (modal: ModalController) => ModalNumberPrompt = (modal) => {
  return (options) => {
    let resolved = false;

    return new Promise((resolve) => {
      const { hasClosed, close } = modal.pushModal({
        disableBackgroundClose: options.disableBackgroundClose,
        disableXClose: options.disableXClose,
        title: options.title,
        body: (
          <ModalNumberPromptBody
            label={options.label}
            submitLabel={options.submitLabel}
            cancelLabel={options.cancelLabel}
            min={options.min}
            max={options.max}
            isFloat={options.isFloat}
            defaultValue={options.defaultValue}
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
