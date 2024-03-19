import React from "react";

export type ModalConfig = {
  title: string;
  body: React.ReactNode;
  disableBackgroundClose?: boolean;
  disableXClose?: boolean;
};

export type ModalHandle = {
  close: () => void;
  hasClosed: Promise<void>;
};

export type ModalController = {
  pushModal: (modalConfig: ModalConfig) => ModalHandle;
  popModal: () => void;
};

export const ModalContext = React.createContext<ModalController>(undefined!);
