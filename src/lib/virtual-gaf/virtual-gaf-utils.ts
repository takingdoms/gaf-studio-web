import { VirtualEntry, VirtualFrame, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

export namespace VirtualGafUtils {
  export function replaceFrame(
    entry: VirtualEntry,
    frameIndex: number,
    frame: VirtualFrame,
  ): VirtualEntry {
    const newFrames = [...entry.frames];
    newFrames[frameIndex] = frame;

    return {
      ...entry,
      frames: newFrames,
    };
  }

  export function replaceSubframe(
    frame: VirtualFrame,
    subframeIndex: number,
    subframe: VirtualFrameDataSingleLayer,
  ): VirtualFrame {
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
