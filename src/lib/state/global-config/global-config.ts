export type ListMode = 'thumbs' | 'minimal' | 'collapsed';

export type GlobalConfig = {
  readonly frameListMode: ListMode;
  readonly subframeListMode: ListMode;
  readonly importerWorkspaceOptionsCollapsed: boolean;
  readonly showMultiFrameFrameData: boolean;
};

export const LIST_MODE_LABEL: Record<ListMode, string> = {
  'thumbs': 'Thumbs',
  'minimal': 'Minimal',
  'collapsed': 'Collapsed',
};
