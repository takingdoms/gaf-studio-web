import { IconCaretDown, IconCaretUp, IconDeviceFloppy, IconFile, IconFolderOpen, IconMinus, IconPlus, IconSettings, IconX, TablerIconsProps } from '@tabler/icons-react';

export type IconProps = TablerIconsProps;
export type IconFunc = (props: IconProps) => React.ReactNode;

export const Icons = {
  NewFile: IconFile,
  OpenFile: IconFolderOpen,
  SaveFile: IconDeviceFloppy,
  CaretDown: IconCaretDown,
  CaretUp: IconCaretUp,
  Options: IconSettings,
  Plus: IconPlus,
  Minus: IconMinus,
  Close: IconX,
} as const satisfies Record<string, IconFunc>;
