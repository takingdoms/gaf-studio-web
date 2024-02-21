import { TafSubFormat } from "@/lib/gaf-studio/main-format";
import { CurrentGaf } from "@/lib/gaf-studio/state/current-gaf";
import { WorkspaceState, WorkspaceStateGaf, WorkspaceStateTaf } from "@/lib/gaf-studio/state/workspace-state";
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

  createNew() {
    const newState = this.initBlank();
    this.setState(newState);
  }

  protected abstract initBlank(): DeepReadonly<TState>;

  abstract getCurrentGaf(): DeepReadonly<CurrentGaf> | null;
}

export type Workspace = WorkspaceGaf | WorkspaceTaf;

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  protected override initBlank() {
    return WorkspaceState.initBlank('gaf');
  }

  override getCurrentGaf(): DeepReadonly<CurrentGaf> {
    return this.state.currentGaf;
  }
}

export class WorkspaceTaf extends BaseWorkspace<WorkspaceStateTaf> {
  protected override initBlank() {
    return WorkspaceState.initBlank('taf');
  }

  override getCurrentGaf(): DeepReadonly<CurrentGaf> | null {
    if (this.state.activeSubFormat === null) {
      return null;
    }

    return this.state.currentGafs[this.state.activeSubFormat];
  }

  setActiveSubFormat(subFormat: TafSubFormat) {
    if (subFormat === this.state.activeSubFormat) {
      return; // nothing to do
    }

    this.setState({
      ...this.state,
      activeSubFormat: subFormat,
    });
  }

  createSubFormat(subFormat: TafSubFormat, setAsActive = false) {
    if (this.state.currentGafs[subFormat] !== null) {
      throw new Error(`Sub-format "${subFormat}" already exists.`);
    }

    const newGaf: CurrentGaf = {
      kind: 'blank',
      entries: [],
    };

    this.setState({
      ...this.state,
      currentGafs: {
        ...this.state.currentGafs,
        [subFormat]: newGaf,
      },
      activeSubFormat: setAsActive ? subFormat : this.state.activeSubFormat,
    });
  }
}
