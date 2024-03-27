import { useTafPairWorkspaceContextUnsafe as useW } from "@/lib/state/workspace/workspace-context/workspace-context";
import { useShallow } from "zustand/react/shallow";

namespace TafPairWorkspaceHelper {
  export function useActiveSubFormat() {
    return useW((state) => state.activeSubFormat);
  }

  export function useSetActiveSubFormat() {
    return useW((state) => state.tafPairOnlyActions.setActiveSubFormat);
  }

  export function useShallowCurrentGafs() {
    return useW(useShallow((state) => {
      return {
        '1555': state.currentTaf1555,
        '4444': state.currentTaf4444,
      };
    }));
  }
}

export { TafPairWorkspaceHelper as TafPairS };
