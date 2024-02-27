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
      });

      return;
    }

    const nextEntry = entries[index];
    const activeFrameIndex = nextEntry.frames.length === 0 ? null : 0;

    this.setState({
      ...this.state,
      activeEntryIndex: index,
      activeFrameIndex,
    });
  }

  setActiveFrameIndex(index: number | null) {
    if (this.state.activeEntryIndex === null) {
      throw new Error(`Can't set active frame index when there's no entry selected.`);
    }

    this.setState({
      ...this.state,
      activeFrameIndex: index,
    });
  }
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;
