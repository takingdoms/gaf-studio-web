import { IconBox, IconBoxMultiple, IconCaretDown, IconCaretUp, IconCircleCaretDown, IconCircleCaretUp, IconCircleCheck, IconCircleOff, IconCircleX, IconDeviceFloppy, IconEdit, IconFile, IconFolderOpen, IconMinus, IconPhotoCancel, IconPhotoCheck, IconPhotoDown, IconPlayerSkipBack, IconPlayerSkipForward, IconPlayerTrackNext, IconPlus, IconSettings, IconSquare, IconSquareNumber1, IconStack, IconX, TablerIconsProps } from '@tabler/icons-react';

export type IconProps = TablerIconsProps;
export type IconFunc = (props: IconProps) => React.ReactNode;

export const Icons = {
  NewFile: IconFile,
  OpenFile: IconFolderOpen,
  SaveFile: IconDeviceFloppy,
  CaretUp: IconCaretUp,
  CaretDown: IconCaretDown,
  Options: IconSettings,
  Plus: IconPlus,
  Minus: IconMinus,
  Close: IconX,
  Block: IconCircleOff,
  CircleX: IconCircleX,
  CircleCheck: IconCircleCheck,
  CircleCaretUp: IconCircleCaretUp,
  CircleCaretDown: IconCircleCaretDown,
  Prev: IconPlayerSkipBack,
  Next: IconPlayerSkipForward,
  NextAll: IconPlayerTrackNext,
  PhotoLossless: IconPhotoCheck,
  PhotoLossy: IconPhotoDown,
  PhotoError: IconPhotoCancel,
  Edit: IconEdit,
  CompositeSubframes: IconStack,
  SingleLayered: IconSquareNumber1,
  MultiLayered: IconBoxMultiple,
} as const satisfies Record<string, IconFunc>;
