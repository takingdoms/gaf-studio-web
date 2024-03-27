import { GafWorkspaceConfig } from "@/lib/state/workspace/gaf/create-gaf-workspace";
import { GafWorkspaceState } from "@/lib/state/workspace/gaf/gaf-workspace-state";
import { TafPairWorkspaceConfig } from "@/lib/state/workspace/taf-pair/create-taf-pair-workspace";
import { TafPairWorkspaceState } from "@/lib/state/workspace/taf-pair/taf-pair";
import { TafSoloWorkspaceConfig } from "@/lib/state/workspace/taf-solo/create-taf-solo-workspace";
import { TafSoloWorkspaceState } from "@/lib/state/workspace/taf-solo/taf-solo";

export type WorkspaceState =
  | GafWorkspaceState
  | TafSoloWorkspaceState
  | TafPairWorkspaceState;

// here for convenience
export type WorkspaceConfigWrapper = {
  format: 'gaf';
  config: GafWorkspaceConfig;
} | {
  format: 'taf-solo';
  config: TafSoloWorkspaceConfig;
} | {
  format: 'taf-pair';
  config: TafPairWorkspaceConfig;
};
