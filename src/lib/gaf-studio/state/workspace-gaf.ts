import { CurrentGaf } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import { BaseWorkspace } from '@/lib/gaf-studio/state/workspace';
import { WorkspaceStateGaf } from '@/lib/gaf-studio/state/workspace-state';
import { WorkspaceStateUtils } from '@/lib/gaf-studio/state/workspace-state-utils';
import { BaseVirtualGafFrameData, VirtualGaf, VirtualGafEntry, VirtualGafFrameDataMultiLayer, VirtualGafFrameDataSingleLayer, VirtualGafLayerData } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { CanvasedImageCompiler } from '@/lib/image/canvased-image-compiler';
import { ImageCompiler } from '@/lib/image/image-compiler';
import { Palette } from '@/lib/image/palette/palette';
import { PaletteUtils } from '@/lib/image/palette/palette-utils';

export class WorkspaceGaf extends BaseWorkspace<WorkspaceStateGaf> {
  private readonly imageCompiler = new CanvasedImageCompiler();

  protected override initBlank(defaultPalette?: CurrentPalette) {
    return WorkspaceStateUtils.initBlank('gaf', defaultPalette ?? this.state.currentPalette);
  }

  override getCurrentGaf(): CurrentGaf {
    return this.state.currentGaf;
  }

  override getEntries(): VirtualGafEntry[] {
    return this.state.currentGaf.virtualGaf.entries;
  }

  setCurrentPalette(newPalette: CurrentPalette) {
    const prevPalette = this.state.currentPalette;

    if (prevPalette.palette === newPalette.palette) { // TODO remove this probably useless check?
      return;
    }

    const newVirtualGaf: VirtualGaf<'gaf'> = {
      ...this.state.currentGaf.virtualGaf,
      entries: recompileVirtualGafEntries({
        palette: newPalette.palette,
        imageCompiler: this.imageCompiler,
      }, this.state.currentGaf.virtualGaf.entries),
    };

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
  entries: VirtualGafEntry<'gaf'>[],
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
    layerData.wrappedImages.paletteIndices,
    config.palette,
  );

  const recompiledImage = config.imageCompiler.compileImage(width, height, colorData);

  return {
    ...layerData,
    wrappedImages: {
      ...layerData.wrappedImages,
      compiledImage: recompiledImage,
    },
  };
}
