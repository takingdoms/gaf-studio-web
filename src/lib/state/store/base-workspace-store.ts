import { MainFormat } from "@/lib/main-format";
import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { ArrayUtils } from "@/lib/utils/array-utils";
import { StateCreator } from "zustand";

export type TestFrame = {
  xOffset: number;
  yOffset: number;
};

export type TestEntry = {
  name: string;
  readonly frames: readonly TestFrame[];
};

export type BaseWorkspaceStoreState<TFormat extends MainFormat> = {
  readonly format: TFormat;
  readonly cursor: WorkspaceCursor;
  readonly entries: readonly TestEntry[];

  readonly setCursor: (cursor: WorkspaceCursor) => void;
  readonly setEntry: (entryIndex: number, entry: TestEntry) => void;
  readonly setFrame: (entryIndex: number, frameIndex: number, frame: TestFrame) => void;
};

type MakeBaseWorkspaceStoreStateCreator =
  <TFormat extends MainFormat>(format: TFormat) =>
    StateCreator<BaseWorkspaceStoreState<TFormat>>;

const make: MakeBaseWorkspaceStoreStateCreator = (format) => (set) => ({
  format,
  cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },
  entries: [
    {
      name: 'entry1',
      frames: [
        { xOffset: 1, yOffset: 2 },
        { xOffset: 10, yOffset: 20 },
        { xOffset: 100, yOffset: 200 },
      ],
    },
    {
      name: 'entry2',
      frames: [
        { xOffset: 3, yOffset: 4 },
        { xOffset: 33, yOffset: 44 },
        { xOffset: 333, yOffset: 444 },
      ],
    },
    {
      name: 'entry3',
      frames: [
        { xOffset: 5, yOffset: 6 },
        { xOffset: 55, yOffset: 66 },
      ],
    },
    {
      name: 'entry4',
      frames: [
        { xOffset: 7, yOffset: 8 },
      ],
    },
  ],
  setCursor: (cursor) => {
    set({ cursor });
  },
  setEntry: (entryIdx, entry) => {
    set((state) => ({
      ...state,
      entries: ArrayUtils.update(state.entries, entryIdx, entry),
    }), true);
  },
  setFrame: (entryIdx, frameIdx, frame) => {
    set((state) => ({
      ...state,
      entries: ArrayUtils.updateFrom(state.entries, entryIdx, (oldEntry) => ({
        ...oldEntry,
        frames: ArrayUtils.update(oldEntry.frames, frameIdx, frame),
      })),
    }), true);
  },
});

export { make as makeBaseWorkspaceStoreStateCreator };

export type BaseWorkspaceStoreInitialState<T extends MainFormat> = {
  format: T;
};
