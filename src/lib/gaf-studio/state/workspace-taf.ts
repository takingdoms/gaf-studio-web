import { TafSubFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateTaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

export class WorkspaceTaf extends BaseWorkspace<WorkspaceStateTaf> {
  protected override initBlank() {
    return WorkspaceStateUtils.initBlank('taf');
  }

  override getCurrentGaf(): DeepReadonly<CurrentGaf> | null {
    if (this.state.activeSubFormat === null) {
      return null;
    }

    return this.state.currentGafs[this.state.activeSubFormat];
  }

  override getEntries(): DeepReadonly<LibGaf.GafEntry[]> | null {
    const currentGaf = this.getCurrentGaf();

    if (currentGaf === null) {
      return null;
    }

    return currentGaf.kind === 'blank'
      ? currentGaf.entries
      : currentGaf.gafResult.gaf.entries;
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
