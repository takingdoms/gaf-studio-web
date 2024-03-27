import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { AbstractWorkspaceState } from "@/lib/state/workspace/abstract-workspace-state";
import { CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";

export type TafPairWorkspaceState = AbstractWorkspaceState & CommonWorkspaceState & {
  readonly format: 'taf';
  readonly mode: 'pair';
  readonly activeSubFormat: TafSubFormat;
  readonly currentTaf1555: CurrentGaf;
  readonly currentTaf4444: CurrentGaf;

  readonly tafPairOnlyActions: {
    readonly setActiveSubFormat: (newActiveSubFormat: TafSubFormat) => void;
  };
};

// the make function will NOT make use of the _makeCommonWorkspace function!
