import { useWorkspaceStore as useStore } from "@/lib/state/store/use-workspace-store";
import { useShallow } from "zustand/react/shallow";

export namespace StoreHelper {
  export function useEntriesLength() {
    return useStore()((state) => state.entries.length);
  }

  export function useEntry(entryIndex: number) {
    return useStore()((state) => state.entries[entryIndex]);
  }

  export function useEntryProps(entryIndex: number) {
    return useStore()(useShallow((state) => {
      const entry = state.entries[entryIndex];
      return {
        name: entry.name,
        framesLength: entry.frames.length,
        // other shallow entry properties here...
      };
    }));
  }

  export function useFrame(entryIndex: number, frameIndex: number) {
    return useStore()((state) => state.entries[entryIndex].frames[frameIndex]);
  }

  export function useSetFrame() {
    return useStore()((state) => state.setFrame);
  }
}

export { StoreHelper as S };
