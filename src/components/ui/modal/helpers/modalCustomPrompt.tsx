import { ModalController } from '@/components/ui/modal/ModalContext';
import React from 'react';

export type ModalCustomBodyCallbacks<T extends any | null> = {
  resolve: (value: T | PromiseLike<T>) => void;
  close: () => void;
};

export type ModalCustomPromptOptions<T extends any | null> = {
  title: string;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
  makeModalBody: (cbs: ModalCustomBodyCallbacks<T>) => React.ReactNode;
};

export type ModalCustomPrompt = <T extends any | null>(options: ModalCustomPromptOptions<T>) => Promise<T>;

export const makeModalCustomPrompt: (modal: ModalController) => ModalCustomPrompt = (modal) => {
  return (options) => {
    let resolved = false;

    return new Promise<any | null>((resolve) => {
      const { hasClosed, close } = modal.pushModal({
        disableBackgroundClose: options.disableBackgroundClose,
        disableXClose: options.disableXClose,
        title: options.title,
        body: options.makeModalBody({
          resolve: (...args) => {
            resolve(...args);
            close();
          },
          close: () => close(),
        }),
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
