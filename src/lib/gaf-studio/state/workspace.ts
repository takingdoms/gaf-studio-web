import { CurrentGaf } from "@/lib/gaf-studio/state/current-gaf";
import { WorkspaceGaf } from "@/lib/gaf-studio/state/workspace-gaf";
import { WorkspaceState } from "@/lib/gaf-studio/state/workspace-state";
import { WorkspaceTaf } from "@/lib/gaf-studio/state/workspace-taf";
import LibGaf from "lib-gaf";
import { DeepReadonly } from "ts-essentials";

// TODO eventually create a WriteableBaseWorkspace that exposes a method to replace the
// internal _state variable. Then I could use this class ONLY inside the App to avoid
// instantiating a new Workspace class on each re-render.
// Every component that uses WorkspaceContext would remain unchanged since they're completely
// unaware of the WriteableBaseWorkspace even existing.

export abstract class BaseWorkspace<TState extends WorkspaceState = WorkspaceState> {
  constructor(
    private readonly _state: DeepReadonly<TState>,
    protected readonly setState: (newState: DeepReadonly<TState>) => void,
  ) {}

  get state(): DeepReadonly<TState> {
    return this._state;
  }

  protected abstract initBlank(): DeepReadonly<TState>;

  abstract getCurrentGaf(): DeepReadonly<CurrentGaf> | null;
  abstract getEntries(): DeepReadonly<LibGaf.GafEntry[]> | null;

  createNew() {
    const newState = this.initBlank();
    this.setState(newState);
  }

  getActiveEntry(): DeepReadonly<LibGaf.GafEntry> | null {
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

  getActiveFrame(): DeepReadonly<LibGaf.GafFrame> | null {
    const { frameIndex } = this.state.cursor;

    if (frameIndex === null) {
      return null;
    }

    const activeEntry = this.getActiveEntry()!;
    return activeEntry.frames[frameIndex];
  }

  getActiveSubframe(): DeepReadonly<LibGaf.GafFrameDataSingleLayer> | null {
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
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;
