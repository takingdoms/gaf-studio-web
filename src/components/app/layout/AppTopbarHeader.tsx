type AppTopbarHeaderProps = {
  label: string;
};

export default function AppTopbarHeader({ label }: AppTopbarHeaderProps) {
  return (
    <div
      className="px-2 py-1 font-bold text-slate-400 hover:text-slate-500 transition-colors
        whitespace-nowrap"
    >
      {label}
    </div>
  );
}
