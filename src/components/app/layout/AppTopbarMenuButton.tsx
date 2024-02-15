type AppTopbarMenuButtonProps = {
  label: string;
};

export default function AppTopbarMenuButton({ label }: AppTopbarMenuButtonProps) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200 active:bg-slate-200 px-2 py-1 whitespace-nowrap"
    >
      {label}
    </button>
  );
}
