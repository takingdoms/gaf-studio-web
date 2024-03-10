import { useWorkspaceStore } from "@/lib/react/use-workspace-store";
import { AnyWorkspaceStore } from "@/lib/react/workspace-store-context";
import { BaseVirtualGafFrameData, VirtualGafEntry, VirtualGafFrame } from "@/lib/virtual-gaf/virtual-gaf";
import { useShallow } from "zustand/react/shallow";

export namespace StoreHelper {
  export const useStore = useWorkspaceStore;

  export function useFormat() {
    return useStore()((state) => state.format);
  }

  /// Warning: listen to changes in any part of the cursor
  export function useCursor() {
    return useStore()(useShallow((state) => {
      return state.cursor;
    }));
  }

  export function useEntriesLength() {
    return useStore()((state) => state.getEntries().length);
  }

  export function useEntry(entryIndex: number) {
    return useStore()((state) => state.getEntries()[entryIndex]);
  }

  function entryToProps(entry: VirtualGafEntry) {
    return {
      name: entry.name,
      unknown1: entry.unknown1,
      unknown2: entry.unknown2,
      framesLength: entry.frames.length,
    };
  }

  export function useEntryProps(entryIndex: number) {
    return useStore()(useShallow((state) => {
      const entry = state.getEntries()[entryIndex];
      return entryToProps(entry);
    }));
  }

  export function useActiveEntryProps() {
    return useStore()(useShallow((state) => {
      const { entryIndex } = state.cursor;

      if (entryIndex === null) {
        return null;
      }

      const entry = state.getEntries()[entryIndex];
      return entryToProps(entry);
    }));
  }

  export function useActiveFrameFrameDataProps() {
    return useStore()(useShallow((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        return null;
      }

      const entry = state.getEntries()[entryIndex];
      const frameData = entry.frames[frameIndex].frameData;

      const frameDataProps: BaseVirtualGafFrameData = {
        width: frameData.width,
        height: frameData.height,
        xOffset: frameData.xOffset,
        yOffset: frameData.yOffset,
        transparencyIndex: frameData.transparencyIndex,
        unknown2: frameData.unknown2,
        unknown3: frameData.unknown3,
      };

      return frameDataProps;
    }));
  }

  export function useActiveSubframeFrameDataProps() {
    return useStore()(useShallow((state) => {
      const { entryIndex, frameIndex, subframeIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        throw new Error(`No active frame.`);
      }

      if (subframeIndex === null) {
        return null;
      }

      const entry = state.getEntries()[entryIndex];
      const frameData = entry.frames[frameIndex].frameData;

      if (frameData.kind === 'single') {
        throw new Error(`Active frame doesn't have subframes.`);
      }

      const subframe = frameData.layers[subframeIndex];

      const frameDataProps: BaseVirtualGafFrameData = {
        width: subframe.width,
        height: subframe.height,
        xOffset: subframe.xOffset,
        yOffset: subframe.yOffset,
        transparencyIndex: subframe.transparencyIndex,
        unknown2: subframe.unknown2,
        unknown3: subframe.unknown3,
      };

      return frameDataProps;
    }));
  }

  export function useFrameDuration(entryIndex: number, frameIndex: number) {
    return useStore()(useShallow((state) => {
      const entry = state.getEntries()[entryIndex];
      return entry.frames[frameIndex].duration;
    }));
  }

  export function useActiveFrameDuration() {
    return useStore()(useShallow((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        return null;
      }

      const entry = state.getEntries()[entryIndex];
      const frame = entry.frames[frameIndex];
      return frame.duration;
    }));
  }

  export function useActiveFrameLayersLength() {
    return useStore()((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        throw new Error(`No active frame.`);
      }

      const entry = state.getEntries()[entryIndex];
      const frame = entry.frames[frameIndex];

      if (frame.frameData.kind === 'single') {
        throw new Error(`Active frame doesn't have subframes.`);
      }

      return frame.frameData.layers.length;
    });
  }

  export function useFrame(entryIndex: number, frameIndex: number) {
    return useStore()((state) => state.getEntries()[entryIndex].frames[frameIndex]);
  }

  /*export function useSetFrame() {
    return useX()((state) => state.setFrame);
  }*/
}

export { StoreHelper as S };
