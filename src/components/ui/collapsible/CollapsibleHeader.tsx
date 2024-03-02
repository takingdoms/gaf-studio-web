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
  const borderCls = expanded ? 'border-slate-400' : 'border-slate-300';

  return (
    <button
      className={`flex items-center border ${borderCls} p-1`
        + ` bg-gradient-to-br from-slate-50 to-slate-200 text-slate-600`
        + ` hover:border-slate-400 hover:text-slate-700 transition-colors`}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded
        ? <Icons.CaretDown className="invisible" />
        : <Icons.CaretUp className="invisible" />}

      <div className="grow font-bold truncate text-sm">
        {children}
      </div>

      {expanded
        ? <Icons.CaretDown />
        : <Icons.CaretUp />}
    </button>
  );
}
