import { Result } from "@/lib/utils/result";
import { VirtualGafPairResultError } from "@/lib/virtual-gaf/virtual-gaf-conversion";
import LibGaf from "@takingdoms/lib-gaf";
import { StrictOmit } from "ts-essentials";

type CompError = StrictOmit<VirtualGafPairResultError, 'path' | 'message'>;

export class GafComparator {
  private compareObjs<T extends object, K extends (keyof T) & (string | number)>(
    obj1: T,
    obj2: T,
    key: K,
  ): null | VirtualGafPairResultError {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return null;
    }

    return {
      valueName: key + '',
      value1555: value1 + '',
      value4444: value2 + '',
    };
  }

  compareEntries<T extends LibGaf.GafFormat>(
    entry1: LibGaf.GafEntry<T>,
    entry2: LibGaf.GafEntry<T>,
  ): Result<null, CompError> {
    const compName = this.compareObjs(entry1, entry2, 'name');
    if (compName !== null) return { kind: 'err', error: compName };

    const compUnknown1 = this.compareObjs(entry1, entry2, 'unknown1');
    if (compUnknown1 !== null) return { kind: 'err', error: compUnknown1 };

    const compUnknown2 = this.compareObjs(entry1, entry2, 'unknown2');
    if (compUnknown2 !== null) return { kind: 'err', error: compUnknown2 };

    return { kind: 'ok', result: null };
  }

  compareFrames<T extends LibGaf.GafFormat>(
    frame1: LibGaf.GafFrame<T>,
    frame2: LibGaf.GafFrame<T>,
  ): Result<null, CompError> {
    const compDuration = this.compareObjs(frame1, frame2, 'duration');
    if (compDuration !== null) return { kind: 'err', error: compDuration };

    return { kind: 'ok', result: null };
  }

  compareBaseFrameDatas(
    frameData1: LibGaf.BaseGafFrameData,
    frameData2: LibGaf.BaseGafFrameData,
  ): Result<null, CompError> {
    const keys: (keyof LibGaf.BaseGafFrameData)[] = [
      'width', 'height', 'xOffset', 'yOffset', 'transparencyIndex',
      'unknown2', 'unknown3',
    ];

    for (const key of keys) {
      const nextComp = this.compareObjs(frameData1, frameData2, key);
      if (nextComp !== null) return { kind: 'err', error: nextComp };
    }

    return { kind: 'ok', result: null };
  }
}
