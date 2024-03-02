import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateGaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import { VirtualGafEntry } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  protected override initBlank(defaultPalette?: CurrentPalette) {
    return WorkspaceStateUtils.initBlank('gaf', defaultPalette ?? this.state.currentPalette);
  }

  override getCurrentGaf(): CurrentGaf {
    return this.state.currentGaf;
  }

  override getEntries(): VirtualGafEntry[] {
    return this.state.currentGaf.virtualGaf.entries;
  }
}
