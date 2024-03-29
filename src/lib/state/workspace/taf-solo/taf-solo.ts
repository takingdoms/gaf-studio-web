import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { AbstractWorkspaceState } from "@/lib/state/workspace/abstract-workspace-state";
import { CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";

export type TafSoloWorkspaceState = AbstractWorkspaceState & CommonWorkspaceState & {
  readonly format: 'taf-solo';
  readonly gafFormat: 'taf';
  readonly currentTaf: CurrentGaf;
  readonly subFormat: TafSubFormat;

  readonly tafSoloOnlyActions: {
    // nothing for now
  };
};
