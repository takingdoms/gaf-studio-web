import React from 'react';

type ImportPreviewWrapperProps = {
  children: React.ReactNode;
};

export default function ImportPreviewWrapper({ children }: ImportPreviewWrapperProps) {
  return (
    <div
      className="flex justify-center items-center border border-slate-300 p-1"
      style={{ maxWidth: 250, maxHeight: 300 }}
    >
      {children}
    </div>
  );
}
