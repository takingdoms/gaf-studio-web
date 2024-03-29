import React from 'react';

type PreludeHeaderProps = {
  children: React.ReactNode;
};

export default function PreludeHeader({ children }: PreludeHeaderProps) {
  return (
    <div className="text-3xl mb-2 text-slate-500 font-bold">
      {children}
    </div>
  );
}
