import { Icons } from '@/lib/react/icons';
import React from 'react';

type CollapsibleHeaderProps = {
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

export default function CollapsibleHeader({
  children,
  expanded,
  setExpanded,
}: CollapsibleHeaderProps) {
  return (
    <button
      className="flex items-center border border-gray-300 p-2
        bg-gradient-to-br from-slate-50 to-slate-200 text-slate-600
        hover:border-slate-400 hover:text-slate-700 transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="grow font-bold truncate text-sm">
        {children}
      </div>

      {expanded
        ? <Icons.CaretDown />
        : <Icons.CaretUp />}
    </button>
  );
}
