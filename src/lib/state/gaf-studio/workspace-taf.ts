import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { BaseWorkspace } from "@/lib/state/gaf-studio/workspace";
import { WorkspaceStateTaf } from "@/lib/state/gaf-studio/workspace-state";
import { WorkspaceStateUtils } from "@/lib/state/utils/workspace-state-utils";
import { VirtualGafEntry } from "@/lib/virtual-gaf/virtual-gaf";

export class WorkspaceTaf extends BaseWorkspace<WorkspaceStateTaf> {
  protected override initBlank() {
    return WorkspaceStateUtils.initBlank('taf');
  }

  override getCurrentGaf(): CurrentGaf | null {
    if (this.state.activeSubFormat === null) {
      return null;
    }

    return this.state.currentGafs[this.state.activeSubFormat];
  }

  override getEntries(): readonly VirtualGafEntry[] | null {
    const currentGaf = this.getCurrentGaf();

    if (currentGaf === null) {
      return null;
    }

    return currentGaf.virtualGaf.entries;
  }

  override setEntries(entries: VirtualGafEntry[]): void {
    const activeSubFormat = this.state.activeSubFormat;

    if (activeSubFormat === null) {
      throw new Error(`No active subFormat.`);
    }

    const currentGaf = this.state.currentGafs[activeSubFormat];

    if (currentGaf === null) {
      throw new Error(`No gaf.`);
    }

    const newCurrentGafs = {
      ...this.state.currentGafs,
    };

    newCurrentGafs[activeSubFormat] = {
      ...currentGaf,
      virtualGaf: {
        ...currentGaf.virtualGaf,
        entries,
      },
    };

    this.setState({
      ...this.state,
      currentGafs: newCurrentGafs,
    });
  }

  setActiveSubFormat(subFormat: TafSubFormat) {
    if (subFormat === this.state.activeSubFormat) {
      return; // nothing to do
    }

    this.setState({
      ...this.state,
      activeSubFormat: subFormat,
      cursor: {
        entryIndex: null,
        frameIndex: null,
        subframeIndex: null,
      },
    });
  }

  createSubFormat(subFormat: TafSubFormat, setAsActive = false) {
    if (this.state.currentGafs[subFormat] !== null) {
      throw new Error(`Sub-format "${subFormat}" already exists.`);
    }

    const newGaf: CurrentGaf = {
      kind: 'blank',
      compiledGaf: null,
      virtualGaf: {
        entries: [],
      },
    };

    this.setState({
      ...this.state,
      currentGafs: {
        ...this.state.currentGafs,
        [subFormat]: newGaf,
      },
      activeSubFormat: setAsActive ? subFormat : this.state.activeSubFormat,
      cursor: setAsActive ? {
        entryIndex: null,
        frameIndex: null,
        subframeIndex: null,
      } : this.state.cursor,
    });
  }
}
