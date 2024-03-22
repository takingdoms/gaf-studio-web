import SolidButton from "@/components/ui/button/SolidButton";
import { ModalConfirmPromptResult } from "@/components/ui/modal/helpers/modalConfirmPrompt";
import React from 'react';

type ModalPromptBodyProps = {
  resolve: (result: ModalConfirmPromptResult) => void;
  text: React.ReactNode;
  confirmLabel: string;
  rejectLabel: string;
};

export default function ModalPromptBody({
  resolve,
  text,
  confirmLabel,
  rejectLabel,
}: ModalPromptBodyProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        {text}
      </div>

      <div className="flex justify-center space-x-4">
        <SolidButton
          color="success"
          onClick={() => resolve(true)}
        >
          {confirmLabel}
        </SolidButton>
        <SolidButton
          color="danger"
          onClick={() => resolve(false)}
        >
          {rejectLabel}
        </SolidButton>
      </div>
    </div>
  );
}
