import SolidButton, { SolidButtonProps } from "@/components/ui/button/SolidButton";
import { ModalConfirmPromptResult } from "@/components/ui/modal/helpers/modalConfirmPrompt";
import React from 'react';

type ModalPromptBodyProps = {
  resolve: (result: ModalConfirmPromptResult) => void;
  text: React.ReactNode;
  confirmLabel: string;
  rejectLabel: string;
  confirmColor?: SolidButtonProps['color'];
  rejectColor?: SolidButtonProps['color'];
};

export default function ModalPromptBody({
  resolve,
  text,
  confirmLabel,
  rejectLabel,
  confirmColor,
  rejectColor,
}: ModalPromptBodyProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        {text}
      </div>

      <div className="flex justify-center space-x-4">
        <SolidButton
          color={confirmColor ?? 'success'}
          onClick={() => resolve(true)}
        >
          {confirmLabel}
        </SolidButton>
        <SolidButton
          color={rejectColor ?? 'danger'}
          onClick={() => resolve(false)}
        >
          {rejectLabel}
        </SolidButton>
      </div>
    </div>
  );
}
