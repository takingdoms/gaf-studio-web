import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateGaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  protected override initBlank() {
    return WorkspaceStateUtils.initBlank('gaf');
  }

  override getCurrentGaf(): DeepReadonly<CurrentGaf> {
    return this.state.currentGaf;
  }

  override getEntries(): DeepReadonly<LibGaf.GafEntry[]> {
    const currentGaf = this.getCurrentGaf();

    return currentGaf.kind === 'blank'
      ? currentGaf.entries
      : currentGaf.gafResult.gaf.entries;
  }
}
