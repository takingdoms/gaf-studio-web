import React from 'react';

type ModalPaddingProps = {
  children: React.ReactNode;
};

export default function ModalPadding({ children }: ModalPaddingProps) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
