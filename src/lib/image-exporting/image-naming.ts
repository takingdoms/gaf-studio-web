export namespace ImageNaming {
  export function nameFrameOrSubframe({
    prefix,
    suffix,
    ext,
    entryName,
    entryIndex,
    frameIndex,
    subframeIndex,
  }: {
    prefix?: string;
    suffix?: string;
    ext: string;
    entryName: string;
    entryIndex: number;
    frameIndex: number;
    subframeIndex?: number;
  }): string {
    prefix ??= '';
    suffix ??= '';

    const entryIdx = (entryIndex + 1).toString().padStart(3, '0');
    const frameIdx = (frameIndex + 1).toString().padStart(3, '0');

    if (subframeIndex === undefined) {
      return `${prefix}${entryName}.${entryIdx}.${frameIdx}${suffix}.${ext}`;
    }
    else {
      const subframeIdx = (subframeIndex + 1).toString().padStart(3, '0');
      return `${prefix}${entryName}.${entryIdx}.${frameIdx}.${subframeIdx}${suffix}.${ext}`;
    }
  }
}
