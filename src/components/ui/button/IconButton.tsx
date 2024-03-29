import { IconFunc } from '@/lib/react/icons';

type IconButtonProps = {
  icon: IconFunc;
  onClick: () => void;
  disabled?: boolean;
  size?: number;
};

export default function IconButton({
  onClick,
  disabled,
  size,
  icon: Icon,
}: IconButtonProps) {
  const cls = disabled
    ? 'text-sky-600 opacity-50'
    : 'text-sky-600 hover:text-sky-500 active:text-sky-500';

  return (
    <button
      className={`${cls} inline-block`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
    >
      <Icon size={size} />
    </button>
  );
}
