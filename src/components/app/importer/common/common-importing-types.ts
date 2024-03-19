import { VirtualFrame, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export type FinalImportResult = {
  type: 'frames';
  frames: VirtualFrame[];
} | {
  type: 'subframes';
  subframes: VirtualFrameDataSingleLayer[];
};
