import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { ALLOWED_FRAME_DATA_MOD_KEYS, CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";
import { WorkspaceState } from "@/lib/state/workspace/workspace-state";
import { ArrayUtils } from "@/lib/utils/array-utils";
import { ObjectUtils } from "@/lib/utils/object-utils";
import { VirtualEntry, VirtualFrame, VirtualFrameDataMultiLayer } from "@/lib/virtual-gaf/virtual-gaf";
import { Writable } from "ts-essentials";
import { StateCreator } from "zustand";

type MakeCommonWorkspace = StateCreator<WorkspaceState, [], [], CommonWorkspaceState>;

export const _makeCommonWorkspace: MakeCommonWorkspace = (set, get, store) => ({
  cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },

  commonActions: {
    setCursor: (newCursor) => set({ cursor: newCursor }),

    getEntries: () => get().abstractActions.getCurrentGaf().virtualGaf.entries,

    setEntries: (newEntries) => {
      const currentGaf = get().abstractActions.getCurrentGaf();
      get().abstractActions.setCurrentGaf({
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

      const newEntry = get().commonActions.getEntries()[entryIndex];

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

      const newEntry = get().commonActions.getEntries()[entryIndex];
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

    getActiveEntry: () => {
      const { entryIndex } = get().cursor;

      if (entryIndex === null) {
        return null;
      }

      const entries = get().commonActions.getEntries();
      return entries[entryIndex];
    },

    getActiveFrame: () => {
      const { frameIndex } = get().cursor;

      if (frameIndex === null) {
        return null;
      }

      return get().commonActions.getActiveEntry()!.frames[frameIndex];
    },

    getActiveSubframe: () => {
      const { subframeIndex } = get().cursor;

      if (subframeIndex === null) {
        return null;
      }

      const activeFrame = get().commonActions.getActiveFrame()!;

      if (activeFrame.frameData.kind === 'single') {
        throw new Error(`Active frame doesn't have subframes.`);
      }

      return activeFrame.frameData.layers[subframeIndex];
    },

    replaceEntry: (entryIndex, newEntry) => {
      const entries = get().commonActions.getEntries();
      const newEntries = ArrayUtils.update(entries, entryIndex, newEntry);
      get().commonActions.setEntries(newEntries);
    },

    replaceFrame: (entryIndex, frameIndex, newFrame) => {
      const entry = get().commonActions.getEntries()[entryIndex];
      const newEntry: typeof entry = {
        ...entry,
        frames: ArrayUtils.update(entry.frames, frameIndex, newFrame),
      };
      get().commonActions.replaceEntry(entryIndex, newEntry);
    },

    replaceSubframe: (entryIndex, frameIndex, subframeIndex, newSubframe) => {
      const entry = get().commonActions.getEntries()[entryIndex];
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

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);
    },

    modifyActiveFrameData: (mod) => {
      mod = ObjectUtils.select(mod, ALLOWED_FRAME_DATA_MOD_KEYS);
      const { entryIndex, frameIndex } = get().cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        throw new Error(`No active frame.`);
      }

      const activeEntry = get().commonActions.getEntries()[entryIndex];
      const activeFrame = activeEntry.frames[frameIndex];

      const newFrame: typeof activeFrame = {
        ...activeFrame,
        frameData: {
          ...activeFrame.frameData,
          ...mod,
        },
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);
    },

    modifyActiveSubframeData: (mod) => {
      mod = ObjectUtils.select(mod, ALLOWED_FRAME_DATA_MOD_KEYS);
      const { entryIndex, frameIndex, subframeIndex } = get().cursor;

      if (subframeIndex === null) {
        throw new Error(`No active subframe.`);
      }

      const activeFrame = get().commonActions.getActiveFrame()!;

      if (activeFrame.frameData.kind === 'single') {
        throw new Error(`Active frame doesn't have subframes.`);
      }

      const subframes = activeFrame.frameData.layers;
      const activeSubframe = subframes[subframeIndex];

      const newSubframe: typeof activeSubframe = {
        ...activeSubframe,
        ...mod,
      };

      get().commonActions.replaceSubframe(entryIndex, frameIndex, subframeIndex, newSubframe);
    },

    modifyActiveFrameDuration: (newDuration) => {
      const { entryIndex, frameIndex } = get().cursor;

      if (entryIndex === null) throw new Error(`No active entry.`);
      if (frameIndex === null) throw new Error(`No active frame.`);

      const activeFrame = get().commonActions.getEntries()[entryIndex].frames[frameIndex];

      const newActiveFrame: typeof activeFrame = {
        ...activeFrame,
        duration: newDuration,
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newActiveFrame);
    },

    modifyActiveSequenceFrameDuration: (newDuration) => {
      const { entryIndex } = get().cursor;

      if (entryIndex === null) throw new Error(`No active entry.`);

      const entry = get().commonActions.getEntries()[entryIndex];

      const newEntry:typeof entry = {
        ...entry,
        frames: entry.frames.map((frame) => {
          return {
            ...frame,
            duration: newDuration,
          };
        }),
      };

      get().commonActions.replaceEntry(entryIndex, newEntry);
    },

    convertSingleFrameToMultiFrame: (entryIndex, frameIndex) => {
      const entries = get().commonActions.getEntries();
      const entry = entries[entryIndex];
      const frame = entry.frames[frameIndex];

      if (frame.frameData.kind === 'multi') {
        throw new Error(`Frame is already multi-layered.`);
      }

      const newFrameData: VirtualFrameDataMultiLayer = {
        ...frame.frameData,
        kind: 'multi',
        layers: [
          { ...frame.frameData },
        ],
      };

      const newFrame: VirtualFrame = {
        ...frame,
        frameData: newFrameData,
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);

      // auto-selects the first subframe of the new multi-layered frame (for user convenience)
      get().commonActions.setCursor({ entryIndex, frameIndex, subframeIndex: 0 });
    },

    convertMultiFrameToSingleFrame: (entryIndex, frameIndex) => {
      const entries = get().commonActions.getEntries();
      const entry = entries[entryIndex];
      const frame = entry.frames[frameIndex];

      if (frame.frameData.kind === 'single') {
        throw new Error(`Frame is already single-layered.`);
      }

      if (frame.frameData.layers.length !== 1) {
        throw new Error(`Frame must have exactly 1 subframe to be converted to single-layered.`);
      }

      const firstLayer = frame.frameData.layers[0];

      const newFrame: VirtualFrame = {
        ...frame,
        frameData: firstLayer,
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);

      // nullifies the subframeIndex! (very important)
      get().commonActions.setCursor({ entryIndex, frameIndex, subframeIndex: null });
    },

    convertActiveFrameToMultiFrame: (ignoreIfNotNeeded) => {
      const activeFrame = get().commonActions.getActiveFrame();

      if (activeFrame === null) {
        throw new Error(`No active frame.`);
      }

      const activeFrameAlreadyMulti = activeFrame.frameData.kind === 'multi';

      if (activeFrameAlreadyMulti && ignoreIfNotNeeded) {
        return false;
      }

      const { entryIndex, frameIndex } = get().cursor;
      get().commonActions.convertSingleFrameToMultiFrame(entryIndex!, frameIndex!);
      return true;
    },

    convertActiveFrameToSingleFrame: (ignoreIfNotNeeded) => {
      const activeFrame = get().commonActions.getActiveFrame();

      if (activeFrame === null) {
        throw new Error(`No active frame.`);
      }

      const activeFrameAlreadySingle = activeFrame.frameData.kind === 'single';

      if (activeFrameAlreadySingle && ignoreIfNotNeeded) {
        return false;
      }

      const { entryIndex, frameIndex } = get().cursor;
      get().commonActions.convertMultiFrameToSingleFrame(entryIndex!, frameIndex!);
      return true;
    },

    createEntry: (name) => {
      const entries = get().commonActions.getEntries();

      const nameExists = entries.some((entry) => entry.name === name);

      if (nameExists) {
        throw new Error(`An entry with this name already exists.`);
      }

      const newEntry: VirtualEntry = {
        name,
        frames: [],
        unknown1: 0x1,
        unknown2: 0x0,
      };

      const newEntries = [ ...entries, newEntry ];
      get().commonActions.setEntries(newEntries);

      // auto-selects the newly created entry (for user convenience)
      get().commonActions.setCursor({
        entryIndex: newEntries.length - 1,
        frameIndex: null,
        subframeIndex: null,
      });
    },

    renameEntry: (entryIndex, newName) => {
      const entries = get().commonActions.getEntries();

      const nameExists = entries.some((entry, index) => {
        return index !== entryIndex && entry.name === newName;
      });

      if (nameExists) {
        throw new Error(`An entry with this name already exists.`);
      }

      const entry = entries[entryIndex];

      const newEntry: typeof entry = {
        ...entry,
        name: newName,
      };

      get().commonActions.replaceEntry(entryIndex, newEntry);
    },

    renameActiveEntry: (newName) => {
      const entryIndex = get().cursor.entryIndex;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      get().commonActions.renameEntry(entryIndex, newName);
    },

    addFrames: (entryIndex, newFrames) => {
      const entry = get().commonActions.getEntries()[entryIndex];

      const newEntry: typeof entry = {
        ...entry,
        frames: [
          ...entry.frames,
          ...newFrames,
        ],
      };

      get().commonActions.replaceEntry(entryIndex, newEntry);
      get().commonActions.setActiveFrameIndex(newEntry.frames.length - 1);
    },

    addFramesToActiveEntry: (newFrames) => {
      const { entryIndex } = get().cursor;
      get().commonActions.addFrames(entryIndex!, newFrames);
    },

    addSubframes: (entryIndex, frameIndex, newSubframes) => {
      const frame = get().commonActions.getEntries()[entryIndex].frames[frameIndex];

      if (frame.frameData.kind === 'single') {
        throw new Error(`Frame does not have subframes.`);
      }

      const newLayers = [
        ...frame.frameData.layers,
        ...newSubframes,
      ];

      const newFrame: typeof frame = {
        ...frame,
        frameData: {
          ...frame.frameData,
          layers: newLayers,
        },
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);
      get().commonActions.setActiveSubframeIndex(newLayers.length - 1);
    },

    addSubframesToActiveFrame: (newSubframes) => {
      const { entryIndex, frameIndex } = get().cursor;
      get().commonActions.addSubframes(entryIndex!, frameIndex!, newSubframes);
    },

    deleteFrame: (entryIndex, frameIndex) => {
      const entries = get().commonActions.getEntries();
      const entry = entries[entryIndex];

      const newFrames = [...entry.frames];
      newFrames.splice(frameIndex, 1);

      const newEntry: typeof entry = {
        ...entry,
        frames: newFrames,
      };

      get().commonActions.replaceEntry(entryIndex, newEntry);

      // unselects the frame that was deleted. very important!
      get().commonActions.setCursor({ entryIndex, frameIndex: null, subframeIndex: null });
    },

    deleteSubframe: (entryIndex, frameIndex, subframeIndex) => {
      const entries = get().commonActions.getEntries();
      const entry = entries[entryIndex];
      const frame = entry.frames[frameIndex];

      if (frame.frameData.kind !== 'multi') {
        throw new Error(`Frame is not multi-layered.`);
      }

      const newLayers = [...frame.frameData.layers];
      newLayers.splice(subframeIndex, 1);

      const newFrame: typeof frame = {
        ...frame,
        frameData: {
          ...frame.frameData,
          layers: newLayers,
        },
      };

      get().commonActions.replaceFrame(entryIndex, frameIndex, newFrame);

      // unselects the subframe that was deleted. very important!
      get().commonActions.setCursor({ entryIndex, frameIndex, subframeIndex: null });
    },

    deleteActiveFrame: () => {
      const { entryIndex, frameIndex } = get().cursor;

      if (entryIndex === null) throw new Error(`No entry selected.`);
      if (frameIndex === null) throw new Error(`No frame selected`);

      get().commonActions.deleteFrame(entryIndex, frameIndex);
    },

    deleteActiveSubframe: () => {
      const { entryIndex, frameIndex, subframeIndex } = get().cursor;

      if (entryIndex === null)    throw new Error(`No entry selected.`);
      if (frameIndex === null)    throw new Error(`No frame selected`);
      if (subframeIndex === null) throw new Error(`No subframe selected`);

      get().commonActions.deleteSubframe(entryIndex, frameIndex, subframeIndex);
    },
  },
});
