import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import { BaseVirtualGafFrameData, VirtualGaf, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import { VirtualGafMakerForGafWrapper } from "@/lib/virtual-gaf/virtual-gaf-conversion";
import { VirtualGafMakerHelper } from "@/lib/virtual-gaf/virtual-gaf-conversion/virtual-gaf-maker-helper";
import LibGaf from "lib-gaf";

export class VirtualGafMakerForGaf extends VirtualGafMakerHelper<'gaf', 'gaf'>
  implements VirtualGafMakerForGafWrapper
{
  constructor(
    private readonly palette: Palette,
    private readonly imageCompiler: ImageCompiler,
  ) {
    super();
  }

  makeVirtualGaf(source: LibGaf.GafResult<'gaf'>): VirtualGaf<'gaf'> {
    return {
      entries: this.makeEntries(source.entries),
    };
  }

  protected makeLayerData(
    srcLayerData: LibGaf.GafLayerData<'gaf'>,
    { width, height, transparencyIndex }: BaseVirtualGafFrameData,
  ): VirtualLayerData<'gaf'> {
    const colorData = PaletteUtils.createColorData(
      width,
      height,
      transparencyIndex,
      srcLayerData.indices,
      this.palette,
    );

    const compiledImage = this.imageCompiler.compileImage(width, height, colorData);

    return {
      kind: 'palette-idx',
      compress: srcLayerData.decompressed,
      imageResource: {
        kind: 'paletted',
        paletteIndices: srcLayerData.indices,
        compiledImage,
      },
    };
  }
}
