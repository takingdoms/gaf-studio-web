export type ListMode = 'thumbs' | 'minimal' | 'slider' | 'collapsed';

export type GlobalConfig = {
  readonly frameListMode: ListMode;
  readonly subframeListMode: ListMode;
  // TODO importerWorkspaceOptionsCollapsed: boolean
};

export const LIST_MODE_LABEL: Record<ListMode, string> = {
  'thumbs': 'Thumbs',
  'minimal': 'Minimal',
  'slider': 'Slider',
  'collapsed': 'Collapsed',
};
