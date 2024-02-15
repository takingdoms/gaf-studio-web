import { IconDeviceFloppy, IconFile, IconFolderOpen, TablerIconsProps } from '@tabler/icons-react';

export type IconProps = TablerIconsProps;
export type IconFunc = (props: IconProps) => React.ReactNode;

export const Icons = {
  NewFile: IconFile,
  OpenFile: IconFolderOpen,
  SaveFile: IconDeviceFloppy,
} as const satisfies Record<string, IconFunc>;
