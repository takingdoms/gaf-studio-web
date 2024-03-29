import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { AbstractWorkspaceState } from "@/lib/state/workspace/abstract-workspace-state";
import { CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";

export type TafPairWorkspaceState = AbstractWorkspaceState & CommonWorkspaceState & {
  readonly format: 'taf-pair';
  readonly gafFormat: 'taf';
  readonly mode: 'pair';
  readonly currentTaf: CurrentGaf;

  readonly tafPairOnlyActions: {
    // nothing for now
  };
};
