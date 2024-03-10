import { BaseVirtualGafFrameData } from "@/lib/virtual-gaf/virtual-gaf";
import { ElementOf } from "ts-essentials";

export const ALLOWED_FRAME_DATA_MOD_KEYS = [
  'xOffset',
  'yOffset',
] as const satisfies (keyof BaseVirtualGafFrameData)[];

export type AllowedFrameDataModification =
  Pick<BaseVirtualGafFrameData, ElementOf<typeof ALLOWED_FRAME_DATA_MOD_KEYS>>;
