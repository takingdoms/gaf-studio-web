import { Icons } from '@/lib/react/icons';

type ExportImageButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
};

export default function ExportImageButton({
  onClick,
  disabled,
  compact,
}: ExportImageButtonProps) {
  const cls = disabled
    ? 'text-sky-600 opacity-30 cursor-not-allowed'
    : 'text-sky-600 hover:bg-slate-50';

  const compactCls = compact
    ? ''
    : 'rounded-tl rounded-tr px-1.5 py-1';

  return (
    <button
      className={`${cls} ${compactCls} flex items-center text-xs font-semibold`}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <Icons.ExportImage
        className="mr-1"
        size={compact ? 14 : 16}
      />
      Export
    </button>
  );
}
