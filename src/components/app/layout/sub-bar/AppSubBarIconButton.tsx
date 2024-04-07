import { IconFunc } from "@/lib/react/icons";

type AppSubBarIconButtonProps = {
  icon: IconFunc;
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  title?: string;
};

export default function AppSubBarIconButton({
  icon: Icon,
  label,
  disabled,
  onClick,
  title,
}: AppSubBarIconButtonProps) {
  const colorCls = disabled
    ? 'text-slate-400'
    : 'text-slate-500 hover:bg-slate-300 active:bg-slate-300';

  return (
    <button
      className={`${colorCls} flex items-center px-1 py-0.5 whitespace-nowrap`}
      disabled={disabled}
      title={title}
      onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }}
    >
      <Icon />
      {label !== undefined && (
        <span className="ml-0.5 text-xs font-bold">
          {label}
        </span>
      )}
    </button>
  );
}
