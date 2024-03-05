import { MainFormat, TafSubFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import { WorkspaceCursor } from '@/lib/gaf-studio/state/workspace-cursor';
import { ReadonlyRecord } from '@/lib/utils/utility-types';

export type WorkspaceStateBase<TFormat extends MainFormat> = {
  readonly format: TFormat;
  readonly cursor: WorkspaceCursor;
};

export type WorkspaceStateGaf = WorkspaceStateBase<'gaf'> & {
  readonly currentGaf: CurrentGaf;
  readonly currentPalette: CurrentPalette;
};

export type WorkspaceStateTaf = WorkspaceStateBase<'taf'> & {
  readonly currentGafs: ReadonlyRecord<TafSubFormat, CurrentGaf | null>;
  readonly activeSubFormat: TafSubFormat | null;
};

export type WorkspaceState =
  | WorkspaceStateGaf
  | WorkspaceStateTaf;
