import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";
import { AbstractWorkspaceState } from "@/lib/state/workspace/abstract-workspace-state";
import { CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";

export type GafWorkspaceState = AbstractWorkspaceState & CommonWorkspaceState & {
  readonly format: 'gaf';
  readonly gafFormat: 'gaf';
  readonly currentGaf: CurrentGaf;
  readonly currentPalette: CurrentPalette;

  readonly gafOnlyActions: {
    readonly setCurrentPalette: (newCurrentPalette: CurrentPalette) => void;
  };
};
