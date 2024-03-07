import { MainFormat, TafSubFormat } from '@/lib/main-format';
import { CurrentGaf } from '@/lib/state/gaf-studio/current-gaf';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { WorkspaceCursor } from '@/lib/state/gaf-studio/workspace-cursor';
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
