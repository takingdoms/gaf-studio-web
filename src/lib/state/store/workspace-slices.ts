import { MainFormat, TafSubFormat } from "@/lib/main-format";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { CurrentGafs } from "@/lib/state/gaf-studio/current-gafs";
import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";
import { WorkspaceCursor } from "@/lib/state/gaf-studio/workspace-cursor";
import { createGafWorkspaceSliceWrapper } from "@/lib/state/store/create-gaf-workspace-slice";
import { createSharedSliceWrapper } from "@/lib/state/store/create-shared-workspace-slice";
import { createTafWorkspaceSliceWrapper } from "@/lib/state/store/create-taf-workspace-slice";
import { AllowedFrameDataModification } from "@/lib/state/store/mods";
import { GafWorkspaceSliceConfig, TafWorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { VirtualEntry, VirtualFrame, VirtualFrameData, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";
import { create } from "zustand";

export type BaseWorkspaceSlice<T extends MainFormat> = {
  readonly format: T;
  readonly cursor: WorkspaceCursor;

  readonly getCurrentGaf: () => CurrentGaf;
  readonly setCurrentGaf: (newCurrentGaf: CurrentGaf) => void;
};

export type TafWorkspaceSlice = BaseWorkspaceSlice<'taf'> & {
  readonly currentGafs: CurrentGafs;
  readonly activeSubFormat: TafSubFormat;

  readonly setActiveSubFormat: (newActiveSubFormat: TafSubFormat) => void;
};

export type GafWorkspaceSlice = BaseWorkspaceSlice<'gaf'> & {
  readonly currentGaf: CurrentGaf;
  readonly currentPalette: CurrentPalette;

  readonly setCurrentPalette: (newCurrentPalette: CurrentPalette) => void;
};

export type SharedWorkspaceSlice<T extends MainFormat> = {
  readonly setCursor: (newCursor: WorkspaceCursor) => void;
  readonly resetCursor: () => void;

  readonly getEntries: () => readonly VirtualEntry<T>[];
  readonly getActiveEntry: () => VirtualEntry<T> | null;
  readonly getActiveFrame: () => VirtualFrame<T> | null;
  readonly getActiveSubframe: () => VirtualFrameDataSingleLayer<T> | null;

  readonly setEntries: (newEntries: readonly VirtualEntry<T>[]) => void;
  readonly setActiveEntryIndex: (entryIndex: number | null) => void
  readonly setActiveFrameIndex: (frameIndex: number | null) => void;
  readonly setActiveSubframeIndex: (subframeIndex: number | null) => void;

  readonly addFrames: (entryIndex: number, newFrames: readonly VirtualFrame<T>[]) => void;
  readonly addFramesToActiveEntry: (newFrames: readonly VirtualFrame<T>[]) => void;
  readonly addSubframes: (
    entryIndex: number,
    frameIndex: number,
    newSubframes: readonly VirtualFrameDataSingleLayer<T>[],
  ) => void;
  readonly addSubframesToActiveFrame: (newSubframes: readonly VirtualFrameDataSingleLayer<T>[]) => void;

  readonly replaceEntry: (entryIndex: number, newEntry: VirtualEntry<T>) => void;
  readonly replaceFrame: (
    entryIndex: number,
    frameIndex: number,
    newFrame: VirtualFrame<T>,
  ) => void;

  readonly replaceSubframe: (
    entryIndex: number,
    frameIndex: number,
    subframeIndex: number,
    newSubframe: VirtualFrameDataSingleLayer<T>,
  ) => void;

  readonly modifyActiveFrameData: (mod: AllowedFrameDataModification) => void;
  readonly modifyActiveSubframeData: (mod: AllowedFrameDataModification) => void;

  readonly convertSingleFrameToMultiFrame: (entryIndex: number, frameIndex: number) => void;
  readonly convertMultiFrameToSingleFrame: (entryIndex: number, frameIndex: number) => void;
  readonly convertActiveFrameToMultiFrame: (ignoreIfNotNeeded: boolean) => boolean; // return if was needed
  readonly convertActiveFrameToSingleFrame: (ignoreIfNotNeeded: boolean) => boolean; // return if was needed

  readonly deleteFrame: (entryIndex: number, frameIndex: number) => void;
  readonly deleteSubframe: (entryIndex: number, frameIndex: number, subframeIndex: number) => void;
  readonly deleteActiveFrame: () => void;
  readonly deleteActiveSubframe: () => void;
};

export const createBoundTafStore = (tafConfig: TafWorkspaceSliceConfig) =>
  create<TafWorkspaceSlice & SharedWorkspaceSlice<'taf'>>()((...args) => ({
    ...createTafWorkspaceSliceWrapper(tafConfig)(...args),
    ...createSharedSliceWrapper<'taf'>()(...args),
  }));

export const createBoundGafStore = (gafConfig: GafWorkspaceSliceConfig) =>
  create<GafWorkspaceSlice & SharedWorkspaceSlice<'gaf'>>()((...args) => ({
    ...createGafWorkspaceSliceWrapper(gafConfig)(...args),
    ...createSharedSliceWrapper<'gaf'>()(...args),
  }));
