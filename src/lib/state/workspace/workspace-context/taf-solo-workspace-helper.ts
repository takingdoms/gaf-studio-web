import { useTafSoloWorkspaceContextUnsafe as useW } from "@/lib/state/workspace/workspace-context/workspace-context";

namespace TafSoloWorkspaceHelper {
  export function useCurrentTaf() {
    return useW((state) => state.currentTaf);
  }
}

export { TafSoloWorkspaceHelper as TafSoloS };
