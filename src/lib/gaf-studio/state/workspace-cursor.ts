export type WorkspaceCursor = {
  entryIndex: null;
  frameIndex: null;
  subframeIndex: null;
} | {
  entryIndex: number;
  frameIndex: null;
  subframeIndex: null;
} | {
  entryIndex: number;
  frameIndex: number;
  subframeIndex: null;
} | {
  entryIndex: number;
  frameIndex: number;
  subframeIndex: number;
};
