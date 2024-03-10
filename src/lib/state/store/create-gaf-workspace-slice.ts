import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { GafWorkspaceSliceConfig } from "@/lib/state/store/workspace-slice-configs";
import { GafWorkspaceSlice } from "@/lib/state/store/workspace-slices";
import { RecompileGaf } from "@/lib/virtual-gaf/recompile-gaf";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import { StateCreator } from "zustand";

type Creator = StateCreator<GafWorkspaceSlice, [], [], GafWorkspaceSlice>;
type CreatorMaker = (config: GafWorkspaceSliceConfig) => Creator;

export const createGafWorkspaceSliceWrapper: CreatorMaker = (config) => (set, get) => ({
  format: 'gaf',

  cursor: { entryIndex: null, frameIndex: null, subframeIndex: null },

  currentGaf: config.initialGaf,

  currentPalette: config.initialPalette,

  setCurrentPalette: (newPalette) => {
    const prevPalette = get().currentPalette;

    if (prevPalette.palette === newPalette.palette) { // TODO remove this probably useless check?
      return;
    }

    const startMs = performance.now();

    const currentGaf = get().currentGaf;

    const newVirtualGaf: VirtualGaf<'gaf'> = {
      ...currentGaf.virtualGaf,
      entries: RecompileGaf.recompileVirtualGafEntries({
        palette: newPalette.palette,
        imageCompiler: new SimpleImageCompiler(),
      }, currentGaf.virtualGaf.entries),
    };

    const deltaMs = performance.now() - startMs;

    console.log(`Took ${deltaMs}ms to create recompile the Virtual Gaf tree.`);

    set({
      currentPalette: newPalette,
      currentGaf: {
        ...currentGaf,
        virtualGaf: newVirtualGaf,
      },
    });
  },

  getCurrentGaf: () => get().currentGaf,

  setCurrentGaf: (newCurrentGaf) => set({ currentGaf: newCurrentGaf }),
});
