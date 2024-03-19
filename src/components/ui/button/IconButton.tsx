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
    ? 'text-orange-600 opacity-50'
    : 'text-orange-600 hover:text-orange-500 active:text-orange-500';

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
