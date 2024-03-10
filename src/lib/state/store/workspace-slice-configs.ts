import { MainFormat, TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { CurrentGafs } from "@/lib/state/gaf-studio/current-gafs";
import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";

export type BaseWorkspaceSliceConfig<T extends MainFormat> = {
  readonly format: T;
};

export type TafWorkspaceSliceConfig = BaseWorkspaceSliceConfig<'taf'> & {
  readonly initialSubFormat: TafSubFormat;
  readonly initialGafs: CurrentGafs;
};

export type GafWorkspaceSliceConfig = BaseWorkspaceSliceConfig<'gaf'> & {
  readonly initialGaf: CurrentGaf;
  readonly initialPalette: CurrentPalette;
};

export type WorkspaceSliceConfig =
  | GafWorkspaceSliceConfig
  | TafWorkspaceSliceConfig;
