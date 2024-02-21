import { IconCaretDown, IconCaretUp, IconDeviceFloppy, IconFile, IconFolderOpen, TablerIconsProps } from '@tabler/icons-react';

export type IconProps = TablerIconsProps;
export type IconFunc = (props: IconProps) => React.ReactNode;

export const Icons = {
  NewFile: IconFile,
  OpenFile: IconFolderOpen,
  SaveFile: IconDeviceFloppy,
  CaretDown: IconCaretDown,
  CaretUp: IconCaretUp,
} as const satisfies Record<string, IconFunc>;
