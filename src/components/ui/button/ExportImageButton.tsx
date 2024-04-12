import { Icons } from '@/lib/react/icons';

type ExportImageButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function ExportImageButton({
  onClick,
  disabled,
}: ExportImageButtonProps) {
  const cls = disabled
    ? 'text-sky-600 opacity-30 cursor-not-allowed'
    : 'text-sky-600 hover:bg-slate-50';

  return (
    <button
      className={`${cls} flex items-center px-1.5 py-1 text-xs font-semibold rounded`}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <Icons.ExportImage
        className="mr-1"
        size={16}
      />
      Export
    </button>
  );
}
