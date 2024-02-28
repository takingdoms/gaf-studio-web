import React from 'react';

type WorkspaceInfoValueProps = {
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
};

export default function WorkspaceInfoValue({ label, children, isLast }: WorkspaceInfoValueProps) {
  return (
    <div className="flex flex-col text-sm max-w-full">
      <div className="px-1 text-center">
        <span className="truncate font-bold text-gray-700">
          {label}:
        </span>
      </div>
      <div className="px-0.5 text-center overflow-auto">
        {children}
      </div>
      {!isLast && (
        <div className="mx-8 border-b border-slate-200 my-1.5" />
      )}
    </div>
  );
}
