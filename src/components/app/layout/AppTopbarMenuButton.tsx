type AppTopBarMenuButtonProps = {
  label: string;
  onClick: () => void;
};

export default function AppTopBarMenuButton({ label, onClick }: AppTopBarMenuButtonProps) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200 active:bg-slate-200 px-2 py-1 whitespace-nowrap"
      onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }}
    >
      {label}
    </button>
  );
}
