import { IconFunc } from '@/lib/react/icons';

type IconButtonProps = {
  icon: IconFunc;
  onClick: () => void;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  disabled,
  ...props
}: IconButtonProps) {
  const cls = disabled
    ? 'text-orange-600 opacity-50'
    : 'text-orange-600 hover:text-orange-500 active:text-orange-500';

  return (
    <button
      className={`${cls} inline-block`}
      onClick={(ev) => {
        ev.preventDefault();
        if (!disabled) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      <props.icon />
    </button>
  );
}
