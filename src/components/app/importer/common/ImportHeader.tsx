import React from 'react';

type ImportHeaderProps = {
  children: React.ReactNode;
};

export default function ImportHeader({ children }: ImportHeaderProps) {
  return (
    <div className="text-center text-sm text-slate-600 font-bold px-0.5 mb-0.5">
      {children}
    </div>
  );
}
