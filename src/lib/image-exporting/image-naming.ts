export namespace ImageNaming {
  export function nameFrameOrSubframe(
    prefix: string,
    ext: string,
    entryName: string,
    entryIndex: number,
    frameIndex: number,
    subframeIndex?: number,
  ): string {
    const entryIdx = (entryIndex + 1).toString().padStart(3, '0');
    const frameIdx = (frameIndex + 1).toString().padStart(3, '0');

    if (subframeIndex === undefined) {
      return `${prefix}${entryName}.${entryIdx}.${frameIdx}.${ext}`;
    }
    else {
      const subframeIdx = (subframeIndex + 1).toString().padStart(3, '0');
      return `${prefix}${entryName}.${entryIdx}.${frameIdx}.${subframeIdx}.${ext}`;
    }
  }
}
