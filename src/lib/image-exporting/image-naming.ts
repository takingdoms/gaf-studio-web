export namespace ImageNaming {
  export function nameFrameOrSubframe({
    prefix,
    suffix,
    ext,
    entryNameOrIndex,
    frameIndex,
    subframeIndex,
  }: {
    prefix?: string;
    suffix?: string;
    ext: string;
    entryNameOrIndex: string | number; // either the name of the entry or its index
    frameIndex: number;
    subframeIndex?: number;
  }): string {
    prefix ??= '';
    suffix ??= '';

    const entryStr = typeof entryNameOrIndex === 'number'
      ? (entryNameOrIndex + 1).toString().padStart(3, '0')
      : entryNameOrIndex;
    const frameIdx = (frameIndex + 1).toString().padStart(3, '0');

    if (subframeIndex === undefined) {
      return `${prefix}${entryStr}.${frameIdx}${suffix}.${ext}`;
    }
    else {
      const subframeIdx = (subframeIndex + 1).toString().padStart(3, '0');
      return `${prefix}${entryStr}.${frameIdx}.${subframeIdx}${suffix}.${ext}`;
    }
  }
}
