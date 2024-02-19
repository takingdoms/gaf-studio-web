import React from 'react';

type PreludeHeaderProps = {
  children: React.ReactNode;
};

export default function PreludeHeader({ children }: PreludeHeaderProps) {
  return (
    <div className="text-2xl text-center text-slate-600">
      {children}
    </div>
  );
}
