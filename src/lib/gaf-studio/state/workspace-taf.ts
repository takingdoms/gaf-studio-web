import { TafSubFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateTaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import { VirtualGafEntry } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';

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

  override getEntries(): VirtualGafEntry[] | null {
    const currentGaf = this.getCurrentGaf();

    if (currentGaf === null) {
      return null;
    }

    return currentGaf.virtualGaf.entries;
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
