import { MainFormat, TafSubFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import LibGaf from 'lib-gaf';

export type WorkspaceStateBase<TFormat extends MainFormat> = {
  format: TFormat;
  activeEntry: LibGaf.GafEntry | undefined;
};

export type WorkspaceStateGaf = WorkspaceStateBase<'gaf'> & {
  currentGaf: CurrentGaf;
  currentPalette: CurrentPalette | null;
};

export type WorkspaceStateTaf = WorkspaceStateBase<'taf'> & {
  // currentTaf1555: CurrentGaf | null;
  // currentTaf4444: CurrentGaf | null;
  currentGafs: Record<TafSubFormat, CurrentGaf | null>;
  activeSubFormat: TafSubFormat | null;
};

export type WorkspaceState =
  | WorkspaceStateGaf
  | WorkspaceStateTaf;
