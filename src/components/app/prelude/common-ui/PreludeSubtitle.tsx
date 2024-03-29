import React from 'react';

type PreludeSubtitleProps = {
  children: React.ReactNode;
};

export default function PreludeSubtitle({ children }: PreludeSubtitleProps) {
  return (
    <div className="text-slate-500 text-sm mb-4">
      {children}
    </div>
  );
}
