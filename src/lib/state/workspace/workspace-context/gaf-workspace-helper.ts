import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";
import { useGafWorkspaceContextUnsafe as useW } from "@/lib/state/workspace/workspace-context/workspace-context";

namespace GafWorkspaceHelper {
  export function useCurrentPalette() {
    return useW((state) => state.currentPalette);
  }

  export function useSetCurrentPalette() {
    return useW((state) => state.gafOnlyActions.setCurrentPalette);
  }
}

export { GafWorkspaceHelper as GafS };
