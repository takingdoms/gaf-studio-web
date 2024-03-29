import { useTafPairWorkspaceContextUnsafe as useW } from "@/lib/state/workspace/workspace-context/workspace-context";

namespace TafPairWorkspaceHelper {
  export function useCurrentTaf() {
    return useW((state) => state.currentTaf);
  }
}

export { TafPairWorkspaceHelper as TafPairS };
