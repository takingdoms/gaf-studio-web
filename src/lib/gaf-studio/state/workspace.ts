import { CurrentGaf } from "@/lib/gaf-studio/state/current-gaf";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import { WorkspaceState } from "@/lib/gaf-studio/state/workspace-state";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import { VirtualGafEntry, VirtualGafFrame, VirtualGafFrameDataSingleLayer, VirtualGafLayerData } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { VirtualGafUtils } from "@/lib/gaf-studio/virtual-gaf/virutal-gaf-utils";
import { ObjectUtils } from "@/lib/utils/object-utils";
import { ElementOf } from "ts-essentials";

// TODO eventually create a WriteableBaseWorkspace that exposes a method to replace the
// internal _state variable. Then I could use this class ONLY inside the App to avoid
// instantiating a new Workspace class on each re-render.
// Every component that uses WorkspaceContext would remain unchanged since they're completely
// unaware of the WriteableBaseWorkspace even existing.

export abstract class BaseWorkspace<TState extends WorkspaceState = WorkspaceState> {
  constructor(
    public readonly state: TState,
    protected readonly setState: (newState: TState) => void,
  ) {}

  protected abstract initBlank(): TState;

  abstract getCurrentGaf(): CurrentGaf | null;
  abstract getEntries(): VirtualGafEntry[] | null;
  abstract setEntries(entries: VirtualGafEntry[]): void;

  createNew() {
    const newState = this.initBlank();
    this.setState(newState);
  }

  getActiveEntry(): VirtualGafEntry | null {
    const { entryIndex } = this.state.cursor;

    if (entryIndex === null) {
      return null;
    }

    const entries = this.getEntries();

    if (entries === null) {
      return null;
    }

    return entries[entryIndex];
  }

  getActiveFrame(): VirtualGafFrame | null {
    const { frameIndex } = this.state.cursor;

    if (frameIndex === null) {
      return null;
    }

    const activeEntry = this.getActiveEntry()!;
    return activeEntry.frames[frameIndex];
  }

  getActiveSubframe(): VirtualGafFrameDataSingleLayer | null {
    const { subframeIndex } = this.state.cursor;

    if (subframeIndex === null) {
      return null;
    }

    const activeFrame = this.getActiveFrame()!;

    if (activeFrame.frameData.kind === 'single') {
      throw new Error(`Current frame is not multi-layered.`);
    }

    return activeFrame.frameData.layers[subframeIndex];
  }

  // TODO prevent redundant index from being set
  setActiveEntryIndex(index: number | null) {
    const entries = this.getEntries();

    if (entries === null) {
      throw new Error(`Can't set active entry index when there are no entries.`);
    }

    if (index === null) {
      this.setState({
        ...this.state,
        cursor: {
          entryIndex: null,
          frameIndex: null,
          subframeIndex: null,
        },
      });

      return;
    }

    const nextEntry = entries[index];
    const activeFrameIndex = nextEntry.frames.length > 0 ? 0 : null;

    if (activeFrameIndex === null) {
      this.setState({
        ...this.state,
        cursor: {
          entryIndex: index,
          frameIndex: null,
          subframeIndex: null,
        },
      });

      return;
    }

    const activeFrame = nextEntry.frames[activeFrameIndex];
    const activeSubframeIndex =
      activeFrame.frameData.kind === 'multi' && activeFrame.frameData.layers.length > 0
        ? 0 : null;

    this.setState({
      ...this.state,
      cursor: {
        entryIndex: index,
        frameIndex: activeFrameIndex,
        subframeIndex: activeSubframeIndex,
      },
    });
  }

  // TODO prevent redundant index from being set
  setActiveFrameIndex(index: number | null) {
    const { entryIndex } = this.state.cursor;

    if (entryIndex === null) {
      throw new Error(`Can't set active frame index when there's no active entry.`);
    }

    if (index === null) {
      this.setState({
        ...this.state,
        cursor: {
          entryIndex,
          frameIndex: null,
          subframeIndex: null,
        },
      });

      return;
    }

    const entry = this.getActiveEntry()!;
    const nextFrame = entry.frames[index];
    const activeSubframeIndex =
      nextFrame.frameData.kind === 'multi' && nextFrame.frameData.layers.length > 0
        ? 0 : null;

    this.setState({
      ...this.state,
      cursor: {
        entryIndex,
        frameIndex: index,
        subframeIndex: activeSubframeIndex,
      },
    });
  }

  // TODO prevent redundant index from being set
  setActiveSubframeIndex(index: number | null) {
    const { entryIndex, frameIndex } = this.state.cursor;

    if (frameIndex === null) {
      throw new Error(`Can't set active subframe index when there's no active frame.`);
    }

    this.setState({
      ...this.state,
      cursor: {
        entryIndex,
        frameIndex,
        subframeIndex: index,
      },
    });
  }

  private replaceActiveEntry(mod: Partial<VirtualGafEntry>) {
    const activeEntryIndex = this.state.cursor.entryIndex;

    if (activeEntryIndex === null) {
      throw new Error(`No active entry.`);
    }

    const entries = this.getEntries()!;
    const activeEntry = entries[activeEntryIndex];

    const newActiveEntry = { ...activeEntry, ...mod };
    const newEntries = [...entries];
    newEntries[activeEntryIndex] = newActiveEntry;

    this.setEntries(newEntries);
  }

  modifyActiveEntry(mod: Partial<Pick<VirtualGafEntry, AllowedEntryModKeys>>) {
    mod = ObjectUtils.select(mod, ALLOWED_ENTRY_MOD_KEYS);
    this.replaceActiveEntry(mod);
  }

  private replaceActiveFrame(mod: Partial<VirtualGafFrame>) {
    const activeFrameIndex = this.state.cursor.frameIndex;

    if (activeFrameIndex === null) {
      throw new Error(`No active frame.`);
    }

    const activeEntry = this.getActiveEntry()!;
    const frames = activeEntry.frames;
    const activeFrame = frames[activeFrameIndex];

    const newActiveFrame = { ...activeFrame, ...mod };
    const newFrames = [...frames];
    newFrames[activeFrameIndex] = newActiveFrame;

    this.replaceActiveEntry({
      ...activeEntry,
      frames: newFrames,
    });
  }

  modifyActiveFrame(mod: Partial<Pick<VirtualGafFrame, AllowedFrameModKeys>>) {
    mod = ObjectUtils.select(mod, ALLOWED_FRAME_MOD_KEYS);
    this.replaceActiveFrame(mod);
  }

  private replaceActiveSubframe(mod: Partial<VirtualGafFrameDataSingleLayer>) {
    const activeSubframeIndex = this.state.cursor.subframeIndex;

    if (activeSubframeIndex === null) {
      throw new Error(`No active subframe.`);
    }

    const activeFrame = this.getActiveFrame()!;

    if (activeFrame.frameData.kind === 'single') {
      throw new Error(`Active frame doesn't have subframes.`);
    }

    const subframes = activeFrame.frameData.layers;
    const activeSubframe = subframes[activeSubframeIndex];

    const newActiveSubframe = { ...activeSubframe, ...mod };
    const newSubframes = [...subframes];
    newSubframes[activeSubframeIndex] = newActiveSubframe;

    this.replaceActiveFrame({
      ...activeFrame,
      frameData: {
        ...activeFrame.frameData,
        layers: newSubframes,
      },
    });
  }

  modifyActiveSubframe(
    mod: Partial<Pick<VirtualGafFrameDataSingleLayer, AllowedFrameDataSingleLayerModKeys>>,
  ) {
    mod = ObjectUtils.select(mod, ALLOWED_FRAME_DATA_SINGLE_LAYER_MOD_KEYS);
    return this.replaceActiveSubframe(mod);
  }

  private replaceEntry(entryIndex: number, newEntry: VirtualGafEntry) {
    const entries = this.getEntries();

    if (entries === null) {
      throw new Error(`No entries.`);
    }

    const newEntries = [...entries];
    newEntries[entryIndex] = newEntry;

    this.setEntries(newEntries);
  }

  protected replaceLayerData(
    layerData: VirtualGafLayerData,
    entryIndex: number,
    frameIndex: number,
    subframeIndex?: number,
  ) {
    const entries = this.getEntries();

    if (entries === null) {
      throw new Error(`No entries.`);
    }

    const entry = entries[entryIndex];
    const frame = entry.frames[frameIndex];

    if (subframeIndex === undefined) {
      if (frame.frameData.kind === 'multi') {
        throw new Error(`Frame has subframes.`);
      }

      const newFrame: typeof frame = {
        ...frame,
        frameData: {
          ...frame.frameData,
          layerData, // <- modified here
        },
      };

      const newEntry = VirtualGafUtils.replaceFrame(entry, frameIndex, newFrame);
      this.replaceEntry(entryIndex, newEntry);
      return;
    }

    if (frame.frameData.kind === 'single') {
      throw new Error(`Frame doesn't have subframes.`);
    }

    const subframe = frame.frameData.layers[subframeIndex];

    const newSubframe: typeof subframe = {
      ...subframe,
      layerData, // <- modified here
    };

    const newFrame = VirtualGafUtils.replaceSubframe(frame, subframeIndex, newSubframe);
    const newEntry = VirtualGafUtils.replaceFrame(entry, frameIndex, newFrame);
    this.replaceEntry(entryIndex, newEntry);
  }
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;

const ALLOWED_ENTRY_MOD_KEYS = [
  'name',
  'unknown1',
  'unknown2',
] as const satisfies (keyof VirtualGafEntry)[];

type AllowedEntryModKeys = ElementOf<typeof ALLOWED_ENTRY_MOD_KEYS>;

const ALLOWED_FRAME_MOD_KEYS = [
  'duration',
] as const satisfies (keyof VirtualGafFrame)[];

type AllowedFrameModKeys = ElementOf<typeof ALLOWED_FRAME_MOD_KEYS>;

const ALLOWED_FRAME_DATA_SINGLE_LAYER_MOD_KEYS = [
  'xOffset',
  'yOffset',
  'unknown2',
  'unknown3',
  'transparencyIndex',
] as const satisfies (keyof VirtualGafFrameDataSingleLayer)[];

type AllowedFrameDataSingleLayerModKeys =
  ElementOf<typeof ALLOWED_FRAME_DATA_SINGLE_LAYER_MOD_KEYS>;
