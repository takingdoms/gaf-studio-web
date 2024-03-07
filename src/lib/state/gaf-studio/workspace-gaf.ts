import { ImageCompiler } from '@/lib/image/compiler/image-compiler';
import { SimpleImageCompiler } from '@/lib/image/compiler/simple-image-compiler';
import { Palette } from '@/lib/image/palette/palette';
import { PaletteUtils } from '@/lib/image/palette/palette-utils';
import { CurrentGaf } from '@/lib/state/gaf-studio/current-gaf';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { BaseWorkspace } from '@/lib/state/gaf-studio/workspace';
import { WorkspaceStateGaf } from '@/lib/state/gaf-studio/workspace-state';
import { WorkspaceStateUtils } from '@/lib/state/utils/workspace-state-utils';
import { VirtualGafEntry, VirtualGaf, VirtualGafFrameDataSingleLayer, VirtualGafFrameDataMultiLayer, VirtualGafLayerData, BaseVirtualGafFrameData } from '@/lib/virtual-gaf/virtual-gaf';

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  private readonly imageCompiler = new SimpleImageCompiler();

  protected override initBlank(defaultPalette?: CurrentPalette) {
    return WorkspaceStateUtils.initBlank('gaf', defaultPalette ?? this.state.currentPalette);
  }

  override getCurrentGaf(): CurrentGaf {
    return this.state.currentGaf;
  }

  override getEntries(): readonly VirtualGafEntry[] {
    return this.state.currentGaf.virtualGaf.entries;
  }

  override setEntries(entries: VirtualGafEntry[]): void {
    this.setState({
      ...this.state,
      currentGaf: {
        ...this.state.currentGaf,
        virtualGaf: {
          entries,
        },
      },
    });
  }

  setCurrentPalette(newPalette: CurrentPalette) {
    const prevPalette = this.state.currentPalette;

    if (prevPalette.palette === newPalette.palette) { // TODO remove this probably useless check?
      return;
    }

    const startMs = performance.now();

    const newVirtualGaf: VirtualGaf<'gaf'> = {
      ...this.state.currentGaf.virtualGaf,
      entries: recompileVirtualGafEntries({
        palette: newPalette.palette,
        imageCompiler: this.imageCompiler,
      }, this.state.currentGaf.virtualGaf.entries),
    };

    const deltaMs = performance.now() - startMs;

    console.log(`Took ${deltaMs}ms to create recompile the Virtual Gaf tree.`);

    this.setState({
      format: this.state.format, // unchanged
      cursor: this.state.cursor, // unchanged
      currentPalette: newPalette,
      currentGaf: {
        ...this.state.currentGaf, // mostly unchanged
        virtualGaf: newVirtualGaf,
      },
    });
  }
}

type Config = {
  palette: Palette;
  imageCompiler: ImageCompiler;
};

function recompileVirtualGafEntries(
  config: Config,
  entries: readonly VirtualGafEntry<'gaf'>[],
): VirtualGafEntry<'gaf'>[] {
  return entries.map((entry) => {
    return {
      ...entry,
      frames: entry.frames.map((frame) => {
        return {
          ...frame,
          frameData: frame.frameData.kind === 'single'
            ? recompileVirtualGafFrameSingle(config, frame.frameData)
            : recompileVirtualGafFrameMulti(config, frame.frameData),
        };
      }),
    };
  });
}

function recompileVirtualGafFrameSingle(
  config: Config,
  frame: VirtualGafFrameDataSingleLayer<'gaf'>,
): typeof frame {
  return {
    ...frame,
    layerData: recompileVirtualLayerData(config, frame.layerData, frame),
  };
}

function recompileVirtualGafFrameMulti(
  config: Config,
  frame: VirtualGafFrameDataMultiLayer<'gaf'>,
):
  typeof frame
{
  return {
    ...frame,
    layers: frame.layers.map((layer) => recompileVirtualGafFrameSingle(config, layer))
  };
}

function recompileVirtualLayerData(
  config: Config,
  layerData: VirtualGafLayerData<'gaf'>,
  { width, height, transparencyIndex }: BaseVirtualGafFrameData,
): typeof layerData {
  const colorData = PaletteUtils.createColorData(
    width,
    height,
    transparencyIndex,
    layerData.imageResource.paletteIndices,
    config.palette,
  );

  const recompiledImage = config.imageCompiler.compileImage(width, height, colorData);

  return {
    ...layerData,
    imageResource: {
      ...layerData.imageResource,
      compiledImage: recompiledImage,
    },
  };
}
