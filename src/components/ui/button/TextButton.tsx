type TextButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function TextButton({
  label,
  onClick,
  disabled,
}: TextButtonProps) {
  const cls = disabled
    ? 'text-orange-600 opacity-50'
    : 'text-orange-600 hover:text-orange-500 active:text-orange-500';

  return (
    <button
      className={`${cls} inline underline`}
      onClick={(ev) => {
        ev.preventDefault();
        if (!disabled) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
