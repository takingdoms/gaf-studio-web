import { ModalConfirmPrompt } from "@/components/ui/modal/helpers/modalConfirmPrompt";
import { ModalCustomPrompt } from "@/components/ui/modal/helpers/modalCustomPrompt";
import { ModalNumberPrompt } from "@/components/ui/modal/helpers/modalNumberPrompt";
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

// Helpers:

export type ModalHelpers = {
  customPrompt: ModalCustomPrompt;
  confirmPrompt: ModalConfirmPrompt;
  numberPrompt: ModalNumberPrompt;
};

export const ModalHelpersContext = React.createContext<ModalHelpers>(undefined!);
