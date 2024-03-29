import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { BaseVirtualGafFrameData, VirtualGaf, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import { VirtualGafMakerForTafSoloWrapper } from "@/lib/virtual-gaf/virtual-gaf-conversion";
import { ConversionCommons } from "@/lib/virtual-gaf/virtual-gaf-conversion/conversion-commons";
import { VirtualGafMakerHelper } from "@/lib/virtual-gaf/virtual-gaf-conversion/virtual-gaf-maker-helper";
import LibGaf from "lib-gaf";

export class VirtualGafMakerForTafSolo extends VirtualGafMakerHelper<'taf', 'taf-solo'>
  implements VirtualGafMakerForTafSoloWrapper
{
  constructor(
    private readonly imageCompiler: ImageCompiler,
  ) {
    super();
  }

  makeVirtualGaf(source: LibGaf.GafResult<'taf'>): VirtualGaf<'taf-solo'> {
    return {
      entries: this.makeEntries(source.entries),
    };
  }

  protected makeLayerData(
    srcLayerData: LibGaf.GafLayerData<'taf'>,
    { width, height }: BaseVirtualGafFrameData,
  ): VirtualLayerData<'taf-solo'> {
    const srcColorData = srcLayerData.colorData;
    const compiledImage = ConversionCommons.compileTafImage(
      srcLayerData.colorData,
      width,
      height,
      this.imageCompiler,
    );

    return {
      kind: 'raw-colors',
      imageResource: {
        kind: 'colored',
        compiledImage,
        colorData: srcColorData,
      },
    };
  }
}
