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
import { VirtualGafEntry, VirtualGafFrame, VirtualGafFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";
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

  readonly getEntries: () => readonly VirtualGafEntry<T>[];
  readonly getActiveEntry: () => VirtualGafEntry<T> | null;
  readonly getActiveFrame: () => VirtualGafFrame<T> | null;
  readonly getActiveSubframe: () => VirtualGafFrameDataSingleLayer<T> | null;

  readonly setEntries: (newEntries: readonly VirtualGafEntry<T>[]) => void;
  readonly setActiveEntryIndex: (entryIndex: number | null) => void
  readonly setActiveFrameIndex: (frameIndex: number | null) => void;
  readonly setActiveSubframeIndex: (subframeIndex: number | null) => void;

  readonly replaceEntry: (entryIndex: number, newEntry: VirtualGafEntry<T>) => void;
  readonly replaceFrame: (
    entryIndex: number,
    frameIndex: number,
    newFrame: VirtualGafFrame<T>,
  ) => void;

  readonly replaceSubframe: (
    entryIndex: number,
    frameIndex: number,
    subframeIndex: number,
    newSubframe: VirtualGafFrameDataSingleLayer<T>,
  ) => void;

  readonly modifyActiveFrameData: (mod: AllowedFrameDataModification) => void;
  readonly modifyActiveSubframeData: (mod: AllowedFrameDataModification) => void;
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
