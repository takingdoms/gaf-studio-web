import React from 'react';

type ModalWrapperProps = {
  children: React.ReactNode;
  zOffset: number;
  close?: () => void;
};

const BASE_Z_INDEX = 100;

export default function ModalWrapper({
  children,
  zOffset,
  close,
}: ModalWrapperProps) {
  const bgCls = zOffset === 0 ? 'bg-[#00000060]' : 'bg-[#0000004F]';

  return (
    <div
      style={{ zIndex: BASE_Z_INDEX + zOffset }}
      className={`absolute inset-0 flex flex-col justify-center items-center max-h-screen overflow-hidden`
        + ` px-4 py-4 ${bgCls}`}
      onClick={close}
    >
      <div
        className="flex flex-col overflow-hidden shadow"
        onClick={(ev) => ev.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
