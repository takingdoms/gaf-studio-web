import React from 'react';

type FlatButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
};

export default function FlatButton({
  children,
  onClick,
  disabled,
  className,
  title,
}: FlatButtonProps) {
  const bgCls = disabled ? '' : 'hover:bg-slate-200';
  const colorCls = disabled ? 'text-slate-400' : 'text-slate-600';

  return (
    <button
      className={`px-1 py-0.5 rounded ${bgCls} ${colorCls} ${className}`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
