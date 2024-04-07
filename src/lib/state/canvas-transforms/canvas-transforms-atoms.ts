import { JotaiUtils } from "@/lib/state/jotai-utils";
import { atom } from "jotai";

export namespace CanvasTransforms {
  export const [pan, usePanListener] = JotaiUtils.atomWithListeners([0, 0]);
  export const lastPanReset = atom(0);
}
