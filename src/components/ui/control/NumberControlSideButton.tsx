import { CONTROL_INPUT_HEIGHT } from "@/lib/constants";

export function NumberControlSideButton({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex justify-center items-center p-0.5 bg-slate-200 hover:bg-slate-100
        border border-slate-300 font-mono"
      style={{ width: CONTROL_INPUT_HEIGHT, height: CONTROL_INPUT_HEIGHT }}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
