export type WorkspaceCursor = {
  readonly entryIndex: null;
  readonly frameIndex: null;
  readonly subframeIndex: null;
} | {
  readonly entryIndex: number;
  readonly frameIndex: null;
  readonly subframeIndex: null;
} | {
  readonly entryIndex: number;
  readonly frameIndex: number;
  readonly subframeIndex: null;
} | {
  readonly entryIndex: number;
  readonly frameIndex: number;
  readonly subframeIndex: number;
};
