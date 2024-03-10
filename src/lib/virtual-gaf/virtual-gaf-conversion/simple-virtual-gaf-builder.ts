import { MainFormat } from "@/lib/main-format";
import { BaseVirtualGafFrameData, VirtualGaf, VirtualEntry, VirtualFrame, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer, VirtualLayerData } from "@/lib/virtual-gaf/virtual-gaf";
import { VirtualGafMaker } from "@/lib/virtual-gaf/virtual-gaf-conversion";
import LibGaf from "lib-gaf";

export abstract class SimpleVirtualGafBuilder<T extends MainFormat> implements VirtualGafMaker<T> {
  makeVirtualGaf(source: LibGaf.GafResult<T>): VirtualGaf<T> {
    const startMs = performance.now();
    const entries = this.makeEntries(source.entries);
    const deltaMs = performance.now() - startMs;

    console.log(`Took ${deltaMs}ms to create the Virtual Gaf tree.`);

    return {
      entries,
    };
  }

  private makeEntries(srcEntries: LibGaf.GafEntry<T>[]): VirtualEntry<T>[] {
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

  private makeFrames(srcFrames: LibGaf.GafFrame<T>[]): VirtualFrame<T>[] {
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

  private makeFrameDataSingle(srcFrameData: LibGaf.GafFrameDataSingleLayer<T>):
    VirtualFrameDataSingleLayer<T>
  {
    const baseData = this.makeBaseFrameData(srcFrameData);

    return {
      ...baseData,
      kind: 'single',
      key: Symbol(),
      layerData: this.makeLayerData(srcFrameData.layerData, baseData),
    };
  }

  private makeFrameDataMulti(srcFrameData: LibGaf.GafFrameDataMultiLayer<T>):
    VirtualFrameDataMultiLayer<T>
  {
    return {
      ...this.makeBaseFrameData(srcFrameData),
      kind: 'multi',
      layers: srcFrameData.layers.map((layer) => this.makeFrameDataSingle(layer)),
    };
  }

  private makeBaseFrameData(srcFrameData: LibGaf.GafFrameData<T>): BaseVirtualGafFrameData {
    return {
      width: srcFrameData.width,
      height: srcFrameData.height,
      xOffset: srcFrameData.xOffset,
      yOffset: srcFrameData.yOffset,
      transparencyIndex: srcFrameData.transparencyIndex,
      unknown2: srcFrameData.unknown2,
      unknown3: srcFrameData.unknown3,
    };
  }

  protected abstract makeLayerData(
    srcLayerData: LibGaf.GafLayerData<T>,
    baseGafFrameData: BaseVirtualGafFrameData,
  ): VirtualLayerData<T>;
}
