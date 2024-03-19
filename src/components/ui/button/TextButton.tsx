type TextButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
};

export default function TextButton({
  label,
  onClick,
  disabled,
  title,
}: TextButtonProps) {
  const cls = disabled
    ? 'text-sky-600 opacity-50'
    : 'text-sky-600 hover:text-sky-500 active:text-sky-500';

  return (
    <button
      className={`${cls} inline`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      title={title}
    >
      [{label}]
    </button>
  );
}
