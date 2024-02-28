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
    if (this.state.activeEntryIndex === null) {
      return null;
    }

    const entries = this.getEntries();

    if (entries === null) {
      return null;
    }

    return entries[this.state.activeEntryIndex];
  }

  getActiveFrame(): DeepReadonly<LibGaf.GafFrame> | null {
    if (this.state.activeFrameIndex === null) {
      return null;
    }

    const activeEntry = this.getActiveEntry();

    if (activeEntry === null) {
      return null;
    }

    return activeEntry.frames[this.state.activeFrameIndex];
  }

  getActiveSubframe(): DeepReadonly<LibGaf.GafFrameDataSingleLayer> | null {
    const activeFrame = this.getActiveFrame();

    if (activeFrame === null) {
      throw new Error(`Can't get active subframe when there's no active frame.`);
    }

    if (this.state.activeSubframeIndex === null) {
      return null;
    }

    if (activeFrame.frameData.kind === 'single') {
      throw new Error(`Current frame is not multi-layered.`);
    }

    return activeFrame.frameData.layers[this.state.activeSubframeIndex];
  }

  setActiveEntryIndex(index: number | null) {
    const entries = this.getEntries();

    if (entries === null) {
      throw new Error(`Can't set active entry index when there are no entries.`);
    }

    if (index === null) {
      this.setState({
        ...this.state,
        activeEntryIndex: null,
        activeFrameIndex: null,
        activeSubframeIndex: null,
      });

      return;
    }

    const nextEntry = entries[index];
    const activeFrameIndex = nextEntry.frames.length === 0 ? null : 0;

    this.setState({
      ...this.state,
      activeEntryIndex: index,
      activeFrameIndex,
      activeSubframeIndex: null, // TODO auto-set to 0 or null
    });
  }

  setActiveFrameIndex(index: number | null) {
    if (this.state.activeEntryIndex === null) {
      throw new Error(`Can't set active frame index when there's no active entry.`);
    }

    this.setState({
      ...this.state,
      activeFrameIndex: index,
      activeSubframeIndex: null, // TODO auto-set to 0 or null
    });
  }

  setActiveSubframeIndex(index: number | null) {
    if (this.state.activeFrameIndex === null) {
      throw new Error(`Can't set active subframe index when there's no actie frame.`);
    }

    this.setState({
      ...this.state,
      activeSubframeIndex: index,
    });
  }

  /*private getFirstFrameIndex(entry: DeepReadonly<LibGaf.GafEntry>): number | null {
    return entry.frames.length === 0 ? null : 0;
  }

  private getFirstSubframeIndex(entry: DeepReadonly<LibGaf.GafEntry>): number | null {
    if (entry.)
  }*/
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;
