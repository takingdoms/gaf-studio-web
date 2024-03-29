import { Result } from "@/lib/utils/result";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export type VirtualGafMakerForGafWrapper = {
  readonly makeVirtualGaf: (source: LibGaf.GafResult<'gaf'>) => VirtualGaf<'gaf'>;
};

export type VirtualGafMakerForTafSoloWrapper = {
  readonly makeVirtualGaf: (source: LibGaf.GafResult<'taf'>) => VirtualGaf<'taf-solo'>;
};

export type VirtualGafMakerForTafPairWrapper = {
  readonly makeVirtualGaf: (
    source1555: LibGaf.GafResult<'taf'>,
    source4444: LibGaf.GafResult<'taf'>,
  ) => VirtualGafPairResult;
};

export type VirtualGafPairResult = Result<VirtualGafPairResultSuccess, VirtualGafPairResultError>;

export type VirtualGafPairResultSuccess = {
  virtualGaf: VirtualGaf<'taf-pair'>;
};

export type VirtualGafPairResultError = { // returned when pair is out of sync
  valueName: string;
  value1555: string | number;
  value4444: string | number;
  path?: VirtualGafPairResultErrorPath;
  message?: string;
  // TODO more detailed type?
};

export type VirtualGafPairResultErrorPath = Array<{ name: string, pos: number }>;
