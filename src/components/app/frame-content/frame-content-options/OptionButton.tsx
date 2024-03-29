import { IconFunc } from '@/lib/react/icons';

type OptionButtonProps = {
  icon: IconFunc;
  label: string;
  onClick: () => void;
};

export default function OptionButton({
  icon: Icon,
  label,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      className="inline-flex items-center bg-slate-400 text-slate-100 px-1.5 py-1
        rounded-tl rounded-tr hover:bg-slate-500 hover:text-white"
      onClick={onClick}
    >
      <Icon size={18} />
      <span className="text-xs font-bold pl-0.5">{label}</span>
    </button>
  );
}
