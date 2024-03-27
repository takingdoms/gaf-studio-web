import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { AbstractWorkspaceState } from "@/lib/state/workspace/abstract-workspace-state";
import { CommonWorkspaceState } from "@/lib/state/workspace/common/common-workspace-state";

export type TafSoloWorkspaceState = AbstractWorkspaceState & CommonWorkspaceState & {
  readonly format: 'taf';
  readonly mode: 'solo';
  readonly subFormat: TafSubFormat;
  readonly currentTaf: CurrentGaf;

  readonly tafSoloOnlyActions: {
    // TODO
  };
};

// the make function will make use of the _makeCommonWorkspace function!
