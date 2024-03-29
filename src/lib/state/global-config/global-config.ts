import { TafSubFormat } from "@/lib/main-format";

export type ListMode = 'thumbs' | 'minimal' | 'collapsed';

export type GlobalConfig = {
  readonly frameListMode: ListMode;
  readonly subframeListMode: ListMode;
  readonly importerWorkspaceOptionsCollapsed: boolean;
  readonly showMultiFrameFrameData: boolean;
  readonly activePairSubFormat: TafSubFormat; // only used when in taf-pair mode
};

export const LIST_MODE_LABEL: Record<ListMode, string> = {
  'thumbs': 'Thumbs',
  'minimal': 'Minimal',
  'collapsed': 'Collapsed',
};
