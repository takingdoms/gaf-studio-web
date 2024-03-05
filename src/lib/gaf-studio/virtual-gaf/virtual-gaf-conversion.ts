import { MainFormat } from "@/lib/gaf-studio/main-format";
import { VirtualGaf } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export type MakeVirtualGaf<T extends MainFormat = MainFormat> =
  (source: LibGaf.GafResult<T>) => VirtualGaf<T>;

export type CommitVirtualGaf<T extends MainFormat = MainFormat> =
  (source: VirtualGaf<T>, prevState?: VirtualGaf<T>) => LibGaf.GafResult<T>;

// wrapper types:

export type VirtualGafMaker<T extends MainFormat = MainFormat> = {
  readonly makeVirtualGaf: MakeVirtualGaf<T>;
};

export type VirtualGafCommiter<T extends MainFormat = MainFormat> = {
  readonly commitVirtualGaf: CommitVirtualGaf<T>;
};
