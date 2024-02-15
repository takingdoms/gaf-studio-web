import { IconFunc } from "@/lib/react/icons";

type AppIconbarButtonProps = {
  icon: IconFunc;
  disabled?: boolean;
};

export default function AppIconbarButton({ disabled, ...props }: AppIconbarButtonProps) {
  const colorCls = disabled
    ? 'text-slate-400 bg-slate-200'
    : 'text-slate-500 bg-slate-200 hover:bg-slate-300 active:bg-slate-300';

  return (
    <button
      className={`${colorCls} px-1 py-0.5 whitespace-nowrap`}
      disabled={disabled}
    >
      <props.icon />
    </button>
  );
}
