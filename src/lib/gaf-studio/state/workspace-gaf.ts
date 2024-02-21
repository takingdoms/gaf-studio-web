import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateGaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import { DeepReadonly } from 'ts-essentials';

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  protected override initBlank() {
    return WorkspaceStateUtils.initBlank('gaf');
  }

  override getCurrentGaf(): DeepReadonly<CurrentGaf> {
    return this.state.currentGaf;
  }
}
