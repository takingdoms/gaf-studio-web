import { useWorkspaceContextUnsafe as useW } from "@/lib/state/workspace/workspace-context/workspace-context";
import { WorkspaceState } from "@/lib/state/workspace/workspace-state";
import { BaseVirtualGafFrameData, VirtualEntry } from "@/lib/virtual-gaf/virtual-gaf";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

namespace WorkspaceHelper {
  export function useFormat() {
    return useW((state) => state.format);
  }

  export function useGafFormat() {
    return useW((state) => state.gafFormat);
  }

  // TODO someday memoize every "expensive looking" selector
  const formatSelector = (state: WorkspaceState) => state.format;
  function useFormat_MemoizedExample() {
    return useW(formatSelector);
  }

  // TODO someday memoize every "expensive looking" selector
  function useEntry_MemoizedExample(entryIndex: number) {
    return useW(
      useCallback((state) => state.commonActions.getEntries()[entryIndex], [entryIndex])
    );
  }

  export function useCursor() {
    return useW((state) => state.cursor);
  }

  /// Warning: listens to changes in any part of the cursor
  export function useShallowCursor() {
    return useW(useShallow((state) => state.cursor));
  }

  export function useCurrentGaf() {
    return useW((state) => state.abstractActions.getCurrentGaf());
  }

  export function useEntries() {
    return useW((state) => state.commonActions.getEntries());
  }

  export function useEntriesLength() {
    return useW((state) => state.commonActions.getEntries().length);
  }

  export function useActiveEntryIndex() {
    return useW((state) => state.cursor.entryIndex);
  }

  export function useActiveFrameIndex() {
    return useW((state) => state.cursor.frameIndex);
  }

  export function useActiveSubframeIndex() {
    return useW((state) => state.cursor.subframeIndex);
  }

  export function useSetActiveEntryIndex() {
    return useW((state) => state.commonActions.setActiveEntryIndex);
  }

  export function useSetActiveFrameIndex() {
    return useW((state) => state.commonActions.setActiveFrameIndex);
  }

  export function useSetActiveSubframeIndex() {
    return useW((state) => state.commonActions.setActiveSubframeIndex);
  }

  export function useHasActiveEntry() {
    return useW((state) => state.cursor.entryIndex !== null);
  }

  export function useHasActiveFrame() {
    return useW((state) => state.cursor.frameIndex !== null);
  }

  export function useHasActiveSubframe() {
    return useW((state) => state.cursor.subframeIndex !== null);
  }

  export function useHasActiveFrameMulti() {
    return useW((state) => (
      state.cursor.entryIndex !== null &&
      state.commonActions.getActiveFrame()?.frameData.kind === 'multi'
    ));
  }

  export function useActiveFrame() {
    return useW((state) => state.commonActions.getActiveFrame());
  }

  export function useActiveSubframe() {
    return useW((state) => state.commonActions.getActiveSubframe);
  }

  export function useIsFrameOrSubframeSelectedAt(type: 'frame' | 'subframe', index: number) {
    return useW((state) => {
      return index === (
        type === 'frame' ? state.cursor.frameIndex : state.cursor.subframeIndex
      );
    });
  }

  export function useIsFrameSelectedAt(frameIndex: number) {
    return useW((state) => state.cursor.frameIndex === frameIndex);
  }

  export function useIsSubframeSelectedAt(subframeIndex: number) {
    return useW((state) => state.cursor.subframeIndex === subframeIndex);
  }

  export function useFrameDataAt(frameIndex: number) {
    return useW((state) => state.commonActions.getActiveEntry()!.frames[frameIndex].frameData);
  }

  export function useSubframeDataAt(frameIndex: number, subframeIndex: number) {
    return useW((state) => {
      const frameData = state.commonActions.getActiveEntry()!.frames[frameIndex].frameData;
      if (frameData.kind === 'single') {
        throw new Error(`Can't use this component for single-layered frameData.`);
      }
      return frameData.layers[subframeIndex];
    });
  }

  export function useSubframesCountAtFrameOrSubframe(type: 'frame' | 'subframe', index: number) {
    return useW((state) => {
      if (type === 'subframe') {
        return null;
      }

      const frameData = state.commonActions.getActiveEntry()!.frames[index].frameData;

      if (frameData.kind === 'single') {
        return null;
      }

      return frameData.layers.length;
    });
  }

  function entryToProps(entry: VirtualEntry) {
    return {
      name: entry.name,
      unknown1: entry.unknown1,
      unknown2: entry.unknown2,
      framesLength: entry.frames.length,
    };
  }

  export function useShallowActiveEntryProps() {
    return useW(useShallow((state) => {
      const { entryIndex } = state.cursor;

      if (entryIndex === null) {
        return null;
      }

      const entry = state.commonActions.getEntries()[entryIndex];
      return entryToProps(entry);
    }));
  }

  export function useShallowActiveFrameDataProps() {
    return useW(useShallow((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        return null;
      }

      const entry = state.commonActions.getEntries()[entryIndex];
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

      return {
        kind: frameData.kind,
        ...frameDataProps,
      };
    }));
  }

  export function useModifyActiveFrameData() {
    return useW((state) => state.commonActions.modifyActiveFrameData);
  }

  export function useActiveFrameDuration() {
    return useW((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        return null;
      }

      const entry = state.commonActions.getEntries()[entryIndex];
      const frame = entry.frames[frameIndex];
      return frame.duration;
    });
  }

  export function useShallowActiveSubframeDataProps() {
    return useW(useShallow((state) => {
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

      const entry = state.commonActions.getEntries()[entryIndex];
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

  export function useModifyActiveSubframeData() {
    return useW((state) => state.commonActions.modifyActiveSubframeData);
  }

  export function useOptionalActiveEntryFramesLength() {
    return useW((state) => state.commonActions.getActiveEntry()?.frames.length);
  }

  export function useActiveFrameLayersLength() {
    return useW((state) => {
      const { entryIndex, frameIndex } = state.cursor;

      if (entryIndex === null) {
        throw new Error(`No active entry.`);
      }

      if (frameIndex === null) {
        throw new Error(`No active frame.`);
      }

      const entry = state.commonActions.getEntries()[entryIndex];
      const frame = entry.frames[frameIndex];

      if (frame.frameData.kind === 'single') {
        throw new Error(`Active frame doesn't have subframes.`);
      }

      return frame.frameData.layers.length;
    });
  }

  export function useOptionalActiveFrameLayersLength() {
    return useW((state) => {
      const frame = state.commonActions.getActiveFrame();

      if (!frame) {
        return null;
      }

      return frame.frameData.kind === 'multi'
        ? frame.frameData.layers.length
        : null;
    });
  }

  export function useConvertActiveFrameToMultiFrame() {
    return useW((state) => state.commonActions.convertActiveFrameToMultiFrame);
  }

  export function useConvertActiveFrameToSingleFrame() {
    return useW((state) => state.commonActions.convertActiveFrameToSingleFrame);
  }

  export function useDeleteActiveFrame() {
    return useW((state) => state.commonActions.deleteActiveFrame);
  }

  export function useDeleteActiveSubframe() {
    return useW((state) => state.commonActions.deleteActiveSubframe);
  }

  export function useAddFramesToActiveEntry() {
    return useW((state) => state.commonActions.addFramesToActiveEntry);
  }

  export function useAddSubframesToActiveFrame() {
    return useW((state) => state.commonActions.addSubframesToActiveFrame);
  }

  export function useOptionalActiveFrameDataKind() {
    return useW((state) => {
      const activeFrame = state.commonActions.getActiveFrame();

      if (activeFrame === null) {
        return null;
      }

      return activeFrame.frameData.kind;
    });
  }

  export function useCurrentGafFileName() {
    return useW((state) => {
      const currentGaf = state.abstractActions.getCurrentGaf();

      if (currentGaf.kind === 'from-file-single') {
        return currentGaf.fileName;
      }
      else if (currentGaf.kind === 'from-file-pair') {
        return currentGaf.data1555.fileName + ' + ' + currentGaf.data4444.fileName;
      }

      return null;
    });
  }
}

export { WorkspaceHelper as S };
