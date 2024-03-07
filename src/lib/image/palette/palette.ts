import { ReadonlyUint8Array } from "@/lib/utils/utility-types";

export type Palette = {
  readonly rgbData: ReadonlyUint8Array; // length should ALWAYS be 256
}
