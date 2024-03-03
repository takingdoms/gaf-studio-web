import { BaseVirtualGafFrameData, VirtualGafLayerData } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";
import { SimpleVirtualGafBuilder } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion/simple-virtual-gaf-builder";
import { ImageCompiler } from "@/lib/image/image-compiler";
import { Palette } from "@/lib/image/palette/palette";
import { PaletteUtils } from "@/lib/image/palette/palette-utils";
import LibGaf from "lib-gaf";

export class PalettedVirtualGafBuilder extends SimpleVirtualGafBuilder<'gaf'> {
  constructor(
    private readonly imageCompiler: ImageCompiler,
    private readonly palette: Palette,
  ) {
    super();
  }

  protected override makeLayerData(
    srcLayerData: LibGaf.GafLayerData<'gaf'>,
    { width, height, transparencyIndex }: BaseVirtualGafFrameData,
  ): VirtualGafLayerData<'gaf'> {
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
