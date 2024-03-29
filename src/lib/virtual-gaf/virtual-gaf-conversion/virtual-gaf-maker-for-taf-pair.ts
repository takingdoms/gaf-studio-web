import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { ColoredImageResource } from "@/lib/image/image-resource";
import { Result } from "@/lib/utils/result";
import { GafComparator } from "@/lib/virtual-gaf/utils/gaf-comparator";
import { VirtualEntry, VirtualFrame, VirtualFrameData, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";
import { VirtualGafMakerForTafPairWrapper, VirtualGafPairResult, VirtualGafPairResultError, VirtualGafPairResultErrorPath } from "@/lib/virtual-gaf/virtual-gaf-conversion";
import { ConversionCommons } from "@/lib/virtual-gaf/virtual-gaf-conversion/conversion-commons";
import LibGaf from "lib-gaf";

export class VirtualGafMakerForTafPair implements VirtualGafMakerForTafPairWrapper
{
  private readonly comparator: GafComparator;

  constructor(
    private readonly imageCompiler: ImageCompiler,
  ) {
    this.comparator = new GafComparator();
  }

  makeVirtualGaf(
    source1555: LibGaf.GafResult<'taf'>,
    source4444: LibGaf.GafResult<'taf'>,
  ): VirtualGafPairResult {
    const entriesResult = this.makeEntries(source1555.entries, source4444.entries);

    if (entriesResult.kind === 'err') {
      return entriesResult;
    }

    return {
      kind: 'ok',
      result: {
        virtualGaf: {
          entries: entriesResult.result,
        },
      },
    };
  }

  private makeEntries(
    srcEntries1555: LibGaf.GafEntry<'taf'>[],
    srcEntries4444: LibGaf.GafEntry<'taf'>[],
  ): Result<VirtualEntry<'taf-pair'>[], VirtualGafPairResultError> {
    if (srcEntries1555.length !== srcEntries4444.length) {
      return {
        kind: 'err',
        error: {
          valueName: `Number of sequences`,
          value1555: srcEntries1555.length,
          value4444: srcEntries4444.length,
        },
      };
    }

    const virtualEntries: VirtualEntry<'taf-pair'>[] = [];

    for (let i = 0; i < srcEntries1555.length; i++) {
      const nextEntry1555 = srcEntries1555[i];
      const nextEntry4444 = srcEntries4444[i];

      const entryPath = [{ name: 'Entry', pos: i }];
      const compEntries = this.comparator.compareEntries(nextEntry1555, nextEntry4444);

      if (compEntries.kind === 'err') {
        return {
          kind: 'err',
          error: { ...compEntries.error, path: entryPath },
        };
      }

      const framesResult = this.makeFrames(nextEntry1555.frames, nextEntry4444.frames, entryPath);

      if (framesResult.kind === 'err') {
        return framesResult;
      }

      virtualEntries.push({
        name: nextEntry1555.name,
        unknown1: nextEntry1555.unknown1,
        unknown2: nextEntry4444.unknown2,
        frames: framesResult.result,
      });
    }

    return {
      kind: 'ok',
      result: virtualEntries,
    };
  }

  private makeFrames(
    srcFrames1555: LibGaf.GafFrame<"taf">[],
    srcFrames4444: LibGaf.GafFrame<"taf">[],
    entryPath: VirtualGafPairResultErrorPath,
  ): Result<VirtualFrame<'taf-pair'>[], VirtualGafPairResultError> {
    if (srcFrames1555.length !== srcFrames4444.length) {
      return {
        kind: 'err',
        error: {
          valueName: `Number of frames`,
          value1555: srcFrames1555.length,
          value4444: srcFrames4444.length,
          path: entryPath,
        },
      };
    }

    const virtualFrames: VirtualFrame<'taf-pair'>[] = [];

    for (let i = 0; i < srcFrames1555.length; i++) {
      const nextFrame1555 = srcFrames1555[i];
      const nextFrame4444 = srcFrames4444[i];

      const framePath = [...entryPath, { name: 'Frame', pos: i }];
      const compFrames = this.comparator.compareFrames(nextFrame1555, nextFrame4444);

      if (compFrames.kind === 'err') {
        return {
          kind: 'err',
          error: { ...compFrames.error, path: framePath },
        };
      }

      const frameDataResult = this.makeFrameData(
        nextFrame1555.frameData,
        nextFrame4444.frameData,
        framePath,
      );

      if (frameDataResult.kind === 'err') {
        return frameDataResult;
      }

      virtualFrames.push({
        duration: nextFrame1555.duration,
        frameData: frameDataResult.result,
      });
    }

    return {
      kind: 'ok',
      result: virtualFrames,
    };
  }

  private makeFrameData(
    srcFrameData1555: LibGaf.GafFrameData<'taf'>,
    srcFrameData4444: LibGaf.GafFrameData<'taf'>,
    framePath: VirtualGafPairResultErrorPath,
  ): Result<VirtualFrameData<'taf-pair'>, VirtualGafPairResultError> {
    if (srcFrameData1555.kind === 'single') {
      if (srcFrameData4444.kind !== 'single') {
        return {
          kind: 'err',
          error: {
            valueName: 'Kind of frameData',
            value1555: 'Single',
            value4444: 'Multi',
            path: framePath,
          },
        };
      }

      return this.makeFrameDataSingle(srcFrameData1555, srcFrameData4444, framePath);
    }

    if (srcFrameData4444.kind !== 'multi') {
      return {
        kind: 'err',
        error: {
          valueName: 'Kind of frameData',
          value1555: 'Multi',
          value4444: 'Single',
          path: framePath,
        },
      };
    }

    return this.makeFrameDataMulti(srcFrameData1555, srcFrameData4444, framePath);
  }

  private makeFrameDataSingle(
    srcFrameData1555: LibGaf.GafFrameDataSingleLayer<'taf'>,
    srcFrameData4444: LibGaf.GafFrameDataSingleLayer<'taf'>,
    framePath: VirtualGafPairResultErrorPath,
  ): Result<VirtualFrameDataSingleLayer<'taf-pair'>, VirtualGafPairResultError> {
    const compBaseFrameDatas = this.comparator.compareBaseFrameDatas(
      srcFrameData1555,
      srcFrameData4444,
    );

    if (compBaseFrameDatas.kind === 'err') {
      return {
        kind: 'err',
        error: { ...compBaseFrameDatas.error, path: framePath },
      };
    }

    // these two are NOT compared, since they'll obviously be always different
    srcFrameData1555.layerData
    srcFrameData4444.layerData

    const imageResource1555 = this.compileImageResource(srcFrameData1555, 'argb1555');
    const imageResource4444 = this.compileImageResource(srcFrameData4444, 'argb4444');

    const frameDataResult: VirtualFrameDataSingleLayer<'taf-pair'> = {
      ...ConversionCommons.makeBaseFrameData(srcFrameData1555),
      kind: 'single',
      layerData: {
        kind: 'raw-colors-pair',
        imageResource1555,
        imageResource4444,
      },
    };

    return { kind: 'ok', result: frameDataResult };
  }

  private makeFrameDataMulti(
    srcFrameData1555: LibGaf.GafFrameDataMultiLayer<'taf'>,
    srcFrameData4444: LibGaf.GafFrameDataMultiLayer<'taf'>,
    framePath: VirtualGafPairResultErrorPath,
  ): Result<VirtualFrameDataMultiLayer<'taf-pair'>, VirtualGafPairResultError> {
    const compBaseFrameDatas = this.comparator.compareBaseFrameDatas(
      srcFrameData1555,
      srcFrameData4444,
    );

    if (compBaseFrameDatas.kind === 'err') {
      return {
        kind: 'err',
        error: { ...compBaseFrameDatas.error, path: framePath },
      };
    }

    if (srcFrameData1555.layers.length !== srcFrameData4444.layers.length) {
      return {
        kind: 'err',
        error: {
          valueName: `Number of subframes`,
          value1555: srcFrameData1555.layers.length,
          value4444: srcFrameData4444.layers.length,
          path: framePath,
        },
      };
    }

    const virtualLayers: VirtualFrameDataSingleLayer<"taf-pair">[] = [];

    for (let i = 0; i < srcFrameData1555.layers.length; i++) {
      const nextSubframe1555 = srcFrameData1555.layers[i];
      const nextSubframe4444 = srcFrameData4444.layers[i];

      const subframePath = [...framePath, { name: 'Subframe', pos: i }];
      const subframeResult = this.makeFrameDataSingle(
        nextSubframe1555,
        nextSubframe4444,
        subframePath,
      );

      if (subframeResult.kind === 'err') {
        return subframeResult;
      }

      virtualLayers.push(subframeResult.result);
    }

    const virtualFrameData: VirtualFrameDataMultiLayer<'taf-pair'> = {
      ...ConversionCommons.makeBaseFrameData(srcFrameData1555),
      kind: 'multi',
      layers: virtualLayers,
    };

    return { kind: 'ok', result: virtualFrameData };
  }

  private compileImageResource<T extends 'argb1555' | 'argb4444'>(
    frameData: LibGaf.GafFrameDataSingleLayer<"taf">,
    colorFormat: T,
  ): ColoredImageResource<T> {
    const colorData = frameData.layerData.colorData;
    const { width, height } = frameData;

    if (!ConversionCommons.isFormat(colorData, colorFormat)) {
      throw new Error(`Invalid color data format. Expected: "${colorFormat}". Got: "${colorData.format}".`);
    }

    const compiledImage = ConversionCommons.compileTafImage(
      colorData,
      width,
      height,
      this.imageCompiler,
    );

    return {
      kind: 'colored',
      compiledImage,
      colorData,
    };
  }
}
