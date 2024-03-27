import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { BaseVirtualGafFrameData, VirtualEntry, VirtualFrame, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";
import { ElementOf } from "ts-essentials";

/**
 * State that is shared between GafWorkspaceState and TafWorkspaceState.
 * The difference between this and AbstractWorkspaceState is that the stuff at Abstract is
 * dependent on the current format ('gaf' or 'taf') and therefore cannot be put in the
 * _makeCommonWorkspace helper function.
 */
export type CommonWorkspaceState = {
  readonly cursor: WorkspaceCursor;

  readonly commonActions: {
    readonly setCursor: (newCursor: WorkspaceCursor) => void;
    readonly getEntries: () => readonly VirtualEntry[];
    readonly setEntries: (newEntries: readonly VirtualEntry[]) => void;

    readonly setActiveEntryIndex: (entryIndex: number | null) => void;
    readonly setActiveFrameIndex: (frameIndex: number | null) => void;
    readonly setActiveSubframeIndex: (subframeIndex: number | null) => void;

    readonly getActiveEntry: () => VirtualEntry | null;
    readonly getActiveFrame: () => VirtualFrame | null;
    readonly getActiveSubframe: () => VirtualFrameDataSingleLayer | null;

    readonly replaceEntry: (entryIndex: number, newEntry: VirtualEntry) => void;
    readonly replaceFrame: (entryIndex: number, frameIndex: number, newFrame: VirtualFrame) => void;
    readonly replaceSubframe: (
      entryIndex: number,
      frameIndex: number,
      subframeIndex: number,
      newSubframe: VirtualFrameDataSingleLayer,
    ) => void;

    readonly modifyActiveFrameData: (mod: AllowedFrameDataModification) => void;
    readonly modifyActiveSubframeData: (mod: AllowedFrameDataModification) => void;

    readonly convertSingleFrameToMultiFrame: (entryIndex: number, frameIndex: number) => void;
    readonly convertMultiFrameToSingleFrame: (entryIndex: number, frameIndex: number) => void;
    readonly convertActiveFrameToMultiFrame: (ignoreIfNotNeeded: boolean) => boolean; // return if was needed
    readonly convertActiveFrameToSingleFrame: (ignoreIfNotNeeded: boolean) => boolean; // return if was needed

    readonly addFrames: (entryIndex: number, newFrames: readonly VirtualFrame[]) => void;
    readonly addFramesToActiveEntry: (newFrames: readonly VirtualFrame[]) => void;
    readonly addSubframes: (
      entryIndex: number,
      frameIndex: number,
      newSubframes: readonly VirtualFrameDataSingleLayer[],
    ) => void;
    readonly addSubframesToActiveFrame: (newSubframes: readonly VirtualFrameDataSingleLayer[]) => void;

    readonly deleteFrame: (entryIndex: number, frameIndex: number) => void;
    readonly deleteSubframe: (entryIndex: number, frameIndex: number, subframeIndex: number) => void;
    readonly deleteActiveFrame: () => void;
    readonly deleteActiveSubframe: () => void;
  };
};

// -------------------------------------------------------------------------------------------------

export const ALLOWED_FRAME_DATA_MOD_KEYS = [
  'xOffset',
  'yOffset',
] as const satisfies (keyof BaseVirtualGafFrameData)[];

export type AllowedFrameDataModification =
  Pick<BaseVirtualGafFrameData, ElementOf<typeof ALLOWED_FRAME_DATA_MOD_KEYS>>;
