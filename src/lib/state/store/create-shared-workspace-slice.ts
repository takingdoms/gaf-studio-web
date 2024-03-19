import { MainFormat } from "@/lib/main-format";
import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { ALLOWED_FRAME_DATA_MOD_KEYS, AllowedFrameDataModification } from "@/lib/state/store/mods";
import { BaseWorkspaceSlice, SharedWorkspaceSlice } from "@/lib/state/store/workspace-slices";
import { ArrayUtils } from "@/lib/utils/array-utils";
import { ObjectUtils } from "@/lib/utils/object-utils";
import { Writable } from "ts-essentials";
import { StateCreator } from "zustand";

type Creator<T extends MainFormat> = StateCreator<
  BaseWorkspaceSlice<T> & SharedWorkspaceSlice<T>,
  [],
  [],
  SharedWorkspaceSlice<T>
>;

type CreatorMaker = <T extends MainFormat>() => Creator<T>;

export const createSharedSliceWrapper: CreatorMaker = () => (set, get) => ({
  setCursor: (newCursor) => set({ cursor: newCursor }),

  resetCursor: () => set({ cursor: { entryIndex: null, frameIndex: null, subframeIndex: null } }),

  getEntries: () => {
    return get().getCurrentGaf().virtualGaf.entries;
  },

  getActiveEntry: () => {
    const { entryIndex } = get().cursor;

    if (entryIndex === null) {
      return null;
    }

    const entries = get().getEntries();
    return entries[entryIndex];
  },

  getActiveFrame: () => {
    const { frameIndex } = get().cursor;

    if (frameIndex === null) {
      return null;
    }

    return get().getActiveEntry()!.frames[frameIndex];
  },

  getActiveSubframe: () => {
    const { subframeIndex } = get().cursor;

    if (subframeIndex === null) {
      return null;
    }

    const activeFrame = get().getActiveFrame()!;

    if (activeFrame.frameData.kind === 'single') {
      throw new Error(`Active frame doesn't have subframes.`);
    }

    return activeFrame.frameData.layers[subframeIndex];
  },

  setEntries: (newEntries) => {
    const currentGaf = get().getCurrentGaf();
    get().setCurrentGaf({
      ...currentGaf,
      virtualGaf:{
        ...currentGaf.virtualGaf,
        entries: newEntries,
      },
    });
  },

  setActiveEntryIndex: (entryIndex) => {
    if (entryIndex === get().cursor.entryIndex) {
      return;
    }

    const newCursor: Writable<WorkspaceCursor> = {
      entryIndex,
      frameIndex: null,
      subframeIndex: null,
    };

    if (entryIndex === null) {
      set({ cursor: newCursor });
      return;
    }

    const newEntry = get().getEntries()[entryIndex];

    if (newEntry.frames.length === 0) {
      set({ cursor: newCursor });
      return;
    }

    newCursor.frameIndex = 0;

    const newFrame = newEntry.frames[0];

    if (newFrame.frameData.kind === 'single' || newFrame.frameData.layers.length === 0) {
      set({ cursor: newCursor });
      return;
    }

    newCursor.subframeIndex = 0;

    set({ cursor: newCursor });
  },

  setActiveFrameIndex: (frameIndex) => {
    const { entryIndex } = get().cursor;

    if (entryIndex === null) {
      throw new Error(`No active entry.`);
    }

    const newCursor: Writable<WorkspaceCursor> = {
      entryIndex,
      frameIndex,
      subframeIndex: null,
    };

    if (frameIndex === null) {
      set({ cursor: newCursor });
      return;
    }

    const newEntry = get().getEntries()[entryIndex];
    const newFrame = newEntry.frames[frameIndex];

    if (newFrame.frameData.kind === 'single' || newFrame.frameData.layers.length === 0) {
      set({ cursor: newCursor });
      return;
    }

    newCursor.subframeIndex = 0;

    set({ cursor: newCursor });
  },

  setActiveSubframeIndex: (subframeIndex) => {
    const { entryIndex, frameIndex } = get().cursor;

    if (entryIndex === null) throw new Error(`No active entry.`);
    if (frameIndex === null) throw new Error(`No active frame.`);

    const newCursor: WorkspaceCursor = {
      entryIndex,
      frameIndex,
      subframeIndex,
    };

    set({ cursor: newCursor });
  },

  addFrames: (entryIndex, newFrames) => {
    const entry = get().getEntries()[entryIndex];

    const newEntry: typeof entry = {
      ...entry,
      frames: [
        ...entry.frames,
        ...newFrames,
      ],
    };

    get().replaceEntry(entryIndex, newEntry);
  },

  addFramesToActiveEntry: (newFrames) => {
    const { entryIndex } = get().cursor;
    get().addFrames(entryIndex!, newFrames);
  },

  addSubframes: (entryIndex, frameIndex, newSubframes) => {
    const frame = get().getEntries()[entryIndex].frames[frameIndex];

    if (frame.frameData.kind === 'single') {
      throw new Error(`Frame does not have subframes.`);
    }

    const newFrame: typeof frame = {
      ...frame,
      frameData: {
        ...frame.frameData,
        layers: [
          ...frame.frameData.layers,
          ...newSubframes,
        ],
      },
    };

    get().replaceFrame(entryIndex, frameIndex, newFrame);
  },

  addSubframesToActiveFrame: (newSubframes) => {
    const { entryIndex, frameIndex } = get().cursor;
    get().addSubframes(entryIndex!, frameIndex!, newSubframes);
  },

  replaceEntry: (entryIndex, newEntry) => {
    const entries = get().getEntries();
    const newEntries = ArrayUtils.update(entries, entryIndex, newEntry);
    get().setEntries(newEntries);
  },

  replaceFrame: (entryIndex, frameIndex, newFrame) => {
    const entry = get().getEntries()[entryIndex];
    const newEntry: typeof entry = {
      ...entry,
      frames: ArrayUtils.update(entry.frames, frameIndex, newFrame),
    };
    get().replaceEntry(entryIndex, newEntry);
  },

  replaceSubframe: (entryIndex, frameIndex, subframeIndex, newSubframe) => {
    const entry = get().getEntries()[entryIndex];
    const frame = entry.frames[frameIndex];
    const frameData = frame.frameData;

    if (frameData.kind === 'single') {
      throw new Error(`Frame doesn't have subframes.`);
    }

    const newFrameData: typeof frameData = {
      ...frameData,
      layers: ArrayUtils.update(frameData.layers, subframeIndex, newSubframe),
    };

    const newFrame: typeof frame = {
      ...frame,
      frameData: newFrameData,
    };

    get().replaceFrame(entryIndex, frameIndex, newFrame);
  },

  modifyActiveFrameData: (mod: AllowedFrameDataModification) => {
    mod = ObjectUtils.select(mod, ALLOWED_FRAME_DATA_MOD_KEYS);
    const { entryIndex, frameIndex } = get().cursor;

    if (entryIndex === null) {
      throw new Error(`No active entry.`);
    }

    if (frameIndex === null) {
      throw new Error(`No active frame.`);
    }

    const activeEntry = get().getEntries()[entryIndex];
    const activeFrame = activeEntry.frames[frameIndex];

    const newFrame: typeof activeFrame = {
      ...activeFrame,
      frameData: {
        ...activeFrame.frameData,
        ...mod,
      },
    };

    get().replaceFrame(entryIndex, frameIndex, newFrame);
  },

  modifyActiveSubframeData: (mod) => {
    mod = ObjectUtils.select(mod, ALLOWED_FRAME_DATA_MOD_KEYS);
    const { entryIndex, frameIndex, subframeIndex } = get().cursor;

    if (subframeIndex === null) {
      throw new Error(`No active subframe.`);
    }

    const activeFrame = get().getActiveFrame()!;

    if (activeFrame.frameData.kind === 'single') {
      throw new Error(`Active frame doesn't have subframes.`);
    }

    const subframes = activeFrame.frameData.layers;
    const activeSubframe = subframes[subframeIndex];

    const newSubframe: typeof activeSubframe = {
      ...activeSubframe,
      ...mod,
    };

    get().replaceSubframe(entryIndex, frameIndex, subframeIndex, newSubframe);
  },
});
