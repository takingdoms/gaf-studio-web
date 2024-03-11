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
  const bgCls = zOffset === 0 ? 'bg-[#00000064]' : 'bg-[#00000032]';

  return (
    <div
      style={{ zIndex: BASE_Z_INDEX + zOffset }}
      className={`absolute inset-0 flex justify-center items-center ${bgCls}`}
      onClick={close}
    >
      <div
        className="flex flex-col shadow"
        onClick={(ev) => ev.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
