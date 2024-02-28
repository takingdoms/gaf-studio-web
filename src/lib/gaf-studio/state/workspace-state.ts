import { MainFormat, TafSubFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';

export type WorkspaceStateBase<TFormat extends MainFormat> = {
  format: TFormat;
  activeEntryIndex: number | null;
  activeFrameIndex: number | null;
  activeSubframeIndex: number | null;
};

export type WorkspaceStateGaf = WorkspaceStateBase<'gaf'> & {
  currentGaf: CurrentGaf;
  currentPalette: CurrentPalette | null;
};

export type WorkspaceStateTaf = WorkspaceStateBase<'taf'> & {
  currentGafs: Record<TafSubFormat, CurrentGaf | null>;
  activeSubFormat: TafSubFormat | null;
};

export type WorkspaceState =
  | WorkspaceStateGaf
  | WorkspaceStateTaf;
