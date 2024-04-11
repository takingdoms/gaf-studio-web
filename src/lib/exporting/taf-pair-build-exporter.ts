import { BuildExportResult, BuildExporter } from "@/lib/exporting/build-exporter";
import { ValidatorFatalError } from "@/lib/exporting/validator/build-validator";
import { TafPairBuildValidator } from "@/lib/exporting/validator/impl/taf-pair-build-validator";
import { ValidatedGafFrameData, ValidatedGafFrameDataSingleLayer, ValidatedGafResult } from "@/lib/exporting/validator/validated-gaf";
import { Result } from "@/lib/utils/result";
import { VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "@takingdoms/lib-gaf";

export class TafPairBuildExporter implements BuildExporter<'taf-pair'> {
  export(
    virtualGaf: VirtualGaf<'taf-pair'>,
    header?: LibGaf.GafHeader,
  ): Result<BuildExportResult<'taf-pair'>, ValidatorFatalError> {
    const validator = new TafPairBuildValidator();
    const validatorResult = validator.build(virtualGaf, header);

    if (validatorResult.kind === 'err') {
      return validatorResult;
    }

    const { taf1555, taf4444 } = unwrapPair(validatorResult.result.actualResult);
    const nonFatalErrors = validatorResult.result.errors;

    return {
      kind: 'ok',
      result: {
        kind: 'taf-pair',
        taf1555,
        taf4444,
        nonFatalErrors,
      },
    };
  }
}

function unwrapPair(vGaf: ValidatedGafResult<'taf', 'pair'>): {
  taf1555: LibGaf.GafResult;
  taf4444: LibGaf.GafResult;
} {
  const entries1555: LibGaf.GafEntry[] = [];
  const entries4444: LibGaf.GafEntry[] = [];

  for (const vEntry of vGaf.entries) {
    const frames1555: LibGaf.GafFrame[] = [];
    const frames4444: LibGaf.GafFrame[] = [];

    for (const vFrame of vEntry.frames) {
      const { frameData1555, frameData4444 } = unwrapFrameData(vFrame.frameData);

      frames1555.push({
        ...vFrame,
        frameData: frameData1555,
      });

      frames4444.push({
        ...vFrame,
        frameData: frameData4444,
      });
    }

    entries1555.push({
      ...vEntry,
      frames: frames1555,
    });

    entries4444.push({
      ...vEntry,
      frames: frames4444,
    });
  }

  const taf1555: LibGaf.GafResult = {
    entries: entries1555,
    header: vGaf.header,
  };

  const taf4444: LibGaf.GafResult = {
    entries: entries4444,
    header: vGaf.header,
  };

  return {
    taf1555,
    taf4444,
  };
}

function unwrapFrameData(vFrameData: ValidatedGafFrameData<'taf', 'pair'>): {
  frameData1555: LibGaf.GafFrameData;
  frameData4444: LibGaf.GafFrameData;
} {
  if (vFrameData.kind === 'single') {
    return unwrapFrameDataSingle(vFrameData);
  }

  const layers = vFrameData.layers.map((vLayer) => unwrapFrameDataSingle(vLayer));

  return {
    frameData1555: {
      ...vFrameData,
      layers: layers.map((layer) => layer.frameData1555),
    },
    frameData4444: {
      ...vFrameData,
      layers: layers.map((layer) => layer.frameData4444),
    },
  };
}

function unwrapFrameDataSingle(vFrameData: ValidatedGafFrameDataSingleLayer<'taf', 'pair'>): {
  frameData1555: LibGaf.GafFrameDataSingleLayer;
  frameData4444: LibGaf.GafFrameDataSingleLayer;
} {
  const frameData1555: LibGaf.GafFrameDataSingleLayer = {
    ...vFrameData,
    layerData: vFrameData.layerData.data1555,
  };

  const frameData4444: LibGaf.GafFrameDataSingleLayer = {
    ...vFrameData,
    layerData: vFrameData.layerData.data4444,
  };

  return {
    frameData1555,
    frameData4444,
  };
}
