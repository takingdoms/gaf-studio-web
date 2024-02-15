type SolidButtonProps = {
  label: string;
};

export default function SolidButton({ label }: SolidButtonProps) {
  return (
    <button
      className="bg-slate-300 hover:bg-slate-100 active:bg-slate-100 px-2 py-1
        border-2 border-t-slate-100 border-l-slate-100 border-r-slate-400 border-b-slate-400"
    >
      {label}
    </button>
  );
}
