import { VirtualEntry, VirtualFrame, VirtualFrameDataSingleLayer, VirtualFrameDataMultiLayer, BaseVirtualGafFrameData, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import { ConversionCommons } from "@/lib/virtual-gaf/virtual-gaf-conversion/conversion-commons";
import LibGaf from "lib-gaf";

export abstract class VirtualGafMakerHelper<
  TInput extends 'gaf' | 'taf',
  TOutput extends (TInput extends 'gaf' ? 'gaf' : 'taf-solo')
> {
  protected abstract makeLayerData(
    srcLayerData: LibGaf.GafLayerData<TInput>,
    baseGafFrameData: BaseVirtualGafFrameData,
  ): VirtualLayerData<TOutput>;

  protected makeEntries(srcEntries: LibGaf.GafEntry<TInput>[]): VirtualEntry<TOutput>[] {
    return srcEntries.map((srcEntry) => {
      return {
        key: Symbol(),
        name: srcEntry.name,
        unknown1: srcEntry.unknown1,
        unknown2: srcEntry.unknown2,
        frames: this.makeFrames(srcEntry.frames),
      };
    });
  }

  private makeFrames(srcFrames: LibGaf.GafFrame<TInput>[]): VirtualFrame<TOutput>[] {
    return srcFrames.map((srcFrame) => {
      const frameData = srcFrame.frameData;

      return {
        key: Symbol(),
        duration: srcFrame.duration,
        frameData: frameData.kind === 'single'
          ? this.makeFrameDataSingle(frameData)
          : this.makeFrameDataMulti(frameData),
      };
    });
  }

  private makeFrameDataSingle(srcFrameData: LibGaf.GafFrameDataSingleLayer<TInput>):
    VirtualFrameDataSingleLayer<TOutput>
  {
    const baseData = ConversionCommons.makeBaseFrameData(srcFrameData);

    return {
      ...baseData,
      kind: 'single',
      layerData: this.makeLayerData(srcFrameData.layerData, baseData),
    };
  }

  private makeFrameDataMulti(srcFrameData: LibGaf.GafFrameDataMultiLayer<TInput>):
    VirtualFrameDataMultiLayer<TOutput>
  {
    return {
      ...ConversionCommons.makeBaseFrameData(srcFrameData),
      kind: 'multi',
      layers: srcFrameData.layers.map((layer) => this.makeFrameDataSingle(layer)),
    };
  }
}
