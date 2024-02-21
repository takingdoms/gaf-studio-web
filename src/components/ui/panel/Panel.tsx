import React from 'react';

type PanelProps = {
  children: React.ReactNode;
};

export default function Panel({
  children,
}: PanelProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-200 border-8 border-slate-200 box-border">
      {children}
    </div>
  );
}
