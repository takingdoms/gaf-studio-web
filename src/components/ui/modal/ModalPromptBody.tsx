import SimpleButton from '@/components/ui/button/SimpleButton';
import { ModalPromptResult } from '@/components/ui/modal/useModalPrompt';
import React from 'react';

type ModalPromptBodyProps = {
  resolve: (result: ModalPromptResult) => void;
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
        <SimpleButton
          color="success"
          onClick={() => resolve(true)}
        >
          {confirmLabel}
        </SimpleButton>
        <SimpleButton
          color="danger"
          onClick={() => resolve(false)}
        >
          {rejectLabel}
        </SimpleButton>
      </div>
    </div>
  );
}
