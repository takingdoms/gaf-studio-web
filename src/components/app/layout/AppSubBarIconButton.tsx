import { IconFunc } from "@/lib/react/icons";

type AppSubBarIconButtonProps = {
  icon: IconFunc;
  disabled?: boolean;
  onClick: () => void;
};

export default function AppSubBarIconButton({
  icon: Icon,
  disabled,
  onClick,
}: AppSubBarIconButtonProps) {
  const colorCls = disabled
    ? 'text-slate-400'
    : 'text-slate-500 hover:bg-slate-300 active:bg-slate-300';

  return (
    <button
      className={`${colorCls} px-1 py-0.5 whitespace-nowrap`}
      disabled={disabled}
      onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }}
    >
      <Icon />
    </button>
  );
}
