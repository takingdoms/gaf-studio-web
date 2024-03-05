import { VirtualGafEntry, VirtualGafFrame, VirtualGafFrameDataMultiLayer, VirtualGafFrameDataSingleLayer } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";

export namespace VirtualGafUtils {
  export function replaceFrame(
    entry: VirtualGafEntry,
    frameIndex: number,
    frame: VirtualGafFrame,
  ): VirtualGafEntry {
    const newFrames = [...entry.frames];
    newFrames[frameIndex] = frame;

    return {
      ...entry,
      frames: newFrames,
    };
  }

  export function replaceSubframe(
    frame: VirtualGafFrame,
    subframeIndex: number,
    subframe: VirtualGafFrameDataSingleLayer,
  ): VirtualGafFrame {
    if (frame.frameData.kind !== 'multi') {
      throw new Error(`Frame doesn't have subframes.`);
    }

    const newSubframes = [...frame.frameData.layers];
    newSubframes[subframeIndex] = subframe;

    return {
      ...frame,
      frameData: {
        ...frame.frameData,
        layers: newSubframes,
      },
    };
  }
}
