import React from 'react';

type SimpleButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'default' | 'success' | 'danger';
  disabled?: boolean;
};

export default function SimpleButton({
  children,
  onClick,
  color,
  disabled,
}: SimpleButtonProps) {
  let cls: string;

  if (disabled) {
    cls
      = color === 'success' ? 'border-emerald-300 text-emerald-300'
      : color === 'danger' ? 'border-rose-300 text-rose-300'
      : 'border-slate-300';
  } else {
    cls
      = color === 'success'
        ? 'border-emerald-400 text-emerald-500 hover:border-emerald-500 hover:text-emerald-600'
      : color === 'danger'
        ? 'border-rose-400 text-rose-500 hover:border-rose-500 hover:text-rose-600'
      : 'border-slate-400 text-slate-500 hover:border-slate-500 hover:text-slate-600';

    cls += ' hover:underline';
  }

  return (
    <button
      className={`${cls} border-2 font-bold px-2.5 py-1.5 rounded-sm`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
