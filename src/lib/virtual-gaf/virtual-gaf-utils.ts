import { MainFormat } from "@/lib/main-format";
import { BaseVirtualGafFrameData, VirtualEntry, VirtualFrame, VirtualFrameData, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export namespace VirtualGafUtils {
  /**
   * Calculates the minimum width [0] and height [1] that are necessary to fit the frameData.
   * If the frameData is single-layer this simply returns the width and height of that layer.
   * Otherwise, it returns the biggest individual width and biggest individual height inside.
   * Edit: Now takes offsets into account (adds their absolute values).
   */
  export function calcBounds(frameData: VirtualFrameData): [number, number] {
    if (frameData.kind === 'single') {
      return [
        frameData.width + Math.abs(frameData.xOffset),
        frameData.height + Math.abs(frameData.yOffset),
      ];
    }

    let maxWidth = 0;
    let maxHeight = 0;

    for (const layer of frameData.layers) {
      const width = layer.width + Math.abs(frameData.xOffset);
      const height = layer.height + Math.abs(frameData.yOffset);

      if (width > maxWidth) {
        maxWidth = width;
      }

      if (height > maxHeight) {
        maxHeight = height;
      }
    }

    return [maxWidth, maxHeight];
  }

  export function convertSingleToMulti<T extends MainFormat>(
    single: VirtualFrameDataSingleLayer<T>,
  ): VirtualFrameDataMultiLayer<T> {
    return {
      width: single.width,
      height: single.height,
      xOffset: single.xOffset,
      yOffset: single.yOffset,
      transparencyIndex: single.transparencyIndex,
      unknown2: single.unknown2,
      unknown3: single.unknown3,

      kind: 'multi',
      layers: [
        single,
      ],
    };
  }
}
