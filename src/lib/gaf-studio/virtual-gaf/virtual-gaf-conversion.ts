import { VirtualGaf } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

export type MakeVirtualGaf =
  (source: LibGaf.GafResult) => VirtualGaf;

export type CommitVirtualGaf =
  (source: VirtualGaf, prevState?: VirtualGaf) => LibGaf.GafResult;
