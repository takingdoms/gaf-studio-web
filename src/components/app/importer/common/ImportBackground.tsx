import React from 'react';

type ImportBackgroundProps = {
  children: React.ReactNode;
};

export default function ImportBackground({ children }: ImportBackgroundProps) {
  return (
    <div className="flex flex-col space-y-4 bg-slate-200 p-4">
      {children}
    </div>
  );
}
