import React from 'react';

export type SolidButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'default' | 'success' | 'danger';
  disabled?: boolean;
};

export default function SolidButton({
  children,
  onClick,
  color,
  disabled,
}: SolidButtonProps) {
  let cls: string;

  if (disabled) {
    cls
      = color === 'success' ? 'bg-emerald-400 text-emerald-100'
      : color === 'danger' ? 'bg-rose-400 text-rose-100'
      : 'bg-slate-400 text-slate-100';
  } else {
    cls
      = color === 'success'
        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
      : color === 'danger'
        ? 'bg-rose-600 hover:bg-rose-500 text-white'
      : 'bg-slate-600 hover:bg-slate-500 text-white';

    cls += ' hover:underline';
  }

  const cursorCls = disabled ? 'cursor-not-allowed' : '';

  return (
    <button
      className={`${cls} ${cursorCls} inline-flex items-center font-bold px-2.5 py-1.5 rounded-sm`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
