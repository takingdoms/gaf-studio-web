import { MainFormat, TafSubFormat } from "@/lib/main-format";
import { WorkspaceConfigWrapper } from "@/lib/state/workspace/workspace-state";
import { DetectedFormat } from "@/lib/utils/format-utils";
import { VirtualGafPairResultError } from "@/lib/virtual-gaf/virtual-gaf-conversion";

export type WorkspaceInitResult<T extends MainFormat> =
  | WorkspaceInitResultSuccess<T>
  | WorkspaceInitError;

export type WorkspaceInitResultSuccess<T extends MainFormat> = {
  kind: 'success';
  configWrapper: WorkspaceConfigWrapper & { format: T };
};

export type WorkspaceInitError = {
  kind: 'error-reading-gaf';
  which?: TafSubFormat;
  error: unknown;
  message?: string;
} | {
  kind: 'invalid-format';
  which?: TafSubFormat;
  detectedFormat: DetectedFormat;
} | {
  kind: 'error-other';
  which?: TafSubFormat;
  error?: unknown;
  message?: string;
} | {
  kind: 'tafs-out-of-sync';
  error: VirtualGafPairResultError;
};
