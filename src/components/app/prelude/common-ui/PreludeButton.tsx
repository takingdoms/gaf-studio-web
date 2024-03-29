import React from 'react';

type PreludeButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function PreludeButton({
  children,
  onClick,
  disabled,
}: PreludeButtonProps) {
  const cls = disabled
    ? 'opacity-60 cursor-default'
    : 'hover:border-slate-400 hover:text-slate-700 transition-colors';

  return (
    <button
      className={`${cls} grow border-2 border-slate-300 flex justify-center items-center` +
        ` text-xl p-4 bg-gradient-to-br from-slate-50 to-slate-200 text-slate-600`}
      onClick={(ev) => {
        ev.preventDefault();
        if (!disabled) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}
