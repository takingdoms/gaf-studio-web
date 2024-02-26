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

  createNew() {
    const newState = this.initBlank();
    this.setState(newState);
  }

  setActiveEntry(activeEntry: DeepReadonly<LibGaf.GafEntry> | undefined) {
    if (activeEntry !== this.state.activeEntry) {
      this.setState({
        ...this.state,
        activeEntry,
      });
    }
  }
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;
