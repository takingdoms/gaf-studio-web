import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";
import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";
import { _makeCommonWorkspace } from "@/lib/state/workspace/common/make-common-workspace";
import { GafWorkspaceState } from "@/lib/state/workspace/gaf/gaf-workspace-state";
import { RecompileGaf } from "@/lib/virtual-gaf/recompile-gaf";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import { StoreApi, createStore } from "zustand";

export type GafWorkspaceConfig = {
  readonly initialGaf: CurrentGaf;
  readonly initialPalette: CurrentPalette;
};

type CreateGafWorkspace = (config: GafWorkspaceConfig) => StoreApi<GafWorkspaceState>;

export const createGafWorkspace: CreateGafWorkspace = (config) => createStore((set, get, store) => {
  const common = _makeCommonWorkspace(set, get, store);

  return {
    format: 'gaf',
    currentGaf: config.initialGaf,
    currentPalette: config.initialPalette,
    cursor: common.cursor,

    abstractActions: {
      getCurrentGaf: () => get().currentGaf,
      setCurrentGaf: (newCurrentGaf) => set({ currentGaf: newCurrentGaf }),
    },

    commonActions: {
      ...common.commonActions,
    },

    gafOnlyActions: {
      setCurrentPalette: (newCurrentPalette) => {
        const prevPalette = get().currentPalette;

        if (prevPalette.palette === newCurrentPalette.palette) { // TODO remove this probably useless check?
          return;
        }

        const startMs = performance.now();

        const currentGaf = get().currentGaf;

        const newVirtualGaf: VirtualGaf<'gaf'> = {
          ...currentGaf.virtualGaf,
          entries: RecompileGaf.recompileVirtualGafEntries({
            palette: newCurrentPalette.palette,
            imageCompiler: new SimpleImageCompiler(),
          }, currentGaf.virtualGaf.entries),
        };

        const deltaMs = performance.now() - startMs;

        console.log(`Took ${deltaMs}ms to create recompile the Virtual Gaf tree.`);

        set({
          currentPalette: newCurrentPalette,
          currentGaf: {
            ...currentGaf,
            virtualGaf: newVirtualGaf,
          },
        });
      },
    },
  };
});
