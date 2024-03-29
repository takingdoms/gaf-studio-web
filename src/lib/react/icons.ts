import { IconAlertTriangle, IconArrowDown, IconArrowRight, IconBoxMultiple, IconCaretDown, IconCaretUp, IconCheck, IconCircle, IconCircleCaretDown, IconCircleCaretUp, IconCircleCheck, IconCircleDot, IconCircleOff, IconCirclePlus, IconCircleX, IconDeviceFloppy, IconDownload, IconEdit, IconFile, IconFolderOpen, IconInfoCircle, IconMinus, IconPhotoCancel, IconPhotoCheck, IconPhotoDown, IconPlayerSkipBack, IconPlayerSkipForward, IconPlayerTrackNext, IconPlus, IconSettings, IconSquareNumber1, IconStack, IconTrash, IconX, TablerIconsProps } from '@tabler/icons-react';

export type IconProps = TablerIconsProps;
export type IconFunc = (props: IconProps) => React.ReactNode;

export const Icons = {
  Delete: IconTrash,
  Warning: IconAlertTriangle,
  ArrowDown: IconArrowDown,
  ArrowRight: IconArrowRight,
  ImportProject: IconDownload,
  BlankProject: IconFile,
  NewFile: IconFile,
  OpenFile: IconFolderOpen,
  SaveFile: IconDeviceFloppy,
  CaretUp: IconCaretUp,
  CaretDown: IconCaretDown,
  Options: IconSettings,
  Plus: IconPlus,
  CirclePlus: IconCirclePlus,
  Minus: IconMinus,
  Close: IconX,
  Block: IconCircleOff,
  X: IconX,
  Circle: IconCircle,
  CircleDot: IconCircleDot,
  CircleX: IconCircleX,
  Check: IconCheck,
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
  Info: IconInfoCircle,
} as const satisfies Record<string, IconFunc>;
