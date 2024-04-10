import { ValidatedGafEntry, ValidatedGafFrame, ValidatedGafFrameData, ValidatedGafFrameDataMultiLayer, ValidatedGafFrameDataSingleLayer, ValidatedGafLayerData, ValidatedGafResult } from "@/lib/exporting/validator/validated-gaf";
import { ValidatorUtils } from "@/lib/exporting/validator/validator-utils";
import { MainFormat } from "@/lib/main-format";
import { Result } from "@/lib/utils/result";
import { GafValidation } from "@/lib/validation/gaf-validation";
import { BaseVirtualGafFrameData, VirtualEntry, VirtualFrame, VirtualFrameData, VirtualFrameDataMultiLayer, VirtualFrameDataSingleLayer, VirtualGaf } from "@/lib/virtual-gaf/virtual-gaf";
import LibGaf from "lib-gaf";

const Consts = LibGaf.Constants;

export type NodePath = { node: string; pos?: number };

export type ValidatorResult<
  TGafFormat extends LibGaf.GafFormat,
  TWrapperKind extends 'solo' | 'pair',
> = {
  actualResult: ValidatedGafResult<TGafFormat, TWrapperKind>;
  errors: ValidatorError[];
};

/// is bad, warns the user that the GAF will probably end up broken, but does not prevent exporting
export type ValidatorError = {
  path: readonly NodePath[];
  message: string;
  severity: 'low' | 'med' | 'high';
};

/// prevents the GAF from being exported altogether
export type ValidatorFatalError = {
  path?: readonly NodePath[];
  message: string;
  nonFatalErrors: readonly ValidatorError[];
};

export abstract class BuildValidator<
  TFormat extends MainFormat,
  TGafFormat extends LibGaf.GafFormat,
  TWrapperKind extends 'solo' | 'pair',
> {
  build(
    virtualGaf: VirtualGaf<TFormat>,
    header?: LibGaf.GafHeader,
  ): Result<ValidatorResult<TGafFormat, TWrapperKind>, ValidatorFatalError> {
    const path: NodePath[] = [];
    const mutErrors: ValidatorError[] = [];

    const entriesResult = this.buildEntries(virtualGaf.entries, path, mutErrors);

    if (entriesResult.kind === 'err') {
      return entriesResult;
    }

    const gaf: ValidatedGafResult<TGafFormat, TWrapperKind> = {
      header: header ?? {
        idVersion: Consts.USUAL_HEADER_ID_VERSION,
        unknown1: Consts.USUAL_HEADER_UNKNOWN1,
      },
      entries: entriesResult.result,
    };

    return {
      kind: 'ok',
      result: {
        actualResult: gaf,
        errors: mutErrors,
      },
    };
  }

  protected abstract buildLayerData(
    virtualFrameData: VirtualFrameDataSingleLayer<TFormat>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafLayerData<TGafFormat, TWrapperKind>, ValidatorFatalError>;

  private buildEntries(
    virtualEntries: readonly VirtualEntry<TFormat>[],
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafEntry<TGafFormat, TWrapperKind>[], ValidatorFatalError> {
    if (virtualEntries.length === 0) {
      return {
        kind: 'err',
        error: {
          path,
          message: `List of sequence is empty.`,
          nonFatalErrors: mutErrors,
        },
      };
    }

    const result: ValidatedGafEntry<TGafFormat, TWrapperKind>[] = [];

    for (let i = 0; i < virtualEntries.length; i++) {
      const virtualEntry = virtualEntries[i];

      const curPath: NodePath[] = [...path, { node: 'Entry', pos: i }];

      const nameValid = GafValidation.validateEntryName(virtualEntry.name);
      if (nameValid.kind === 'invalid') {
        mutErrors.push({
          path: path,
          message: `Name is invalid. Reason: ${nameValid.reason}`,
          severity: 'med',
        });
      }

      ValidatorUtils.validateIntValueAndSize(
        'Unknown1',
        virtualEntry.unknown1,
        Consts.USUAL_ENTRY_UNKNOWN1,
        'u16',
        path,
        mutErrors,
      );

      ValidatorUtils.validateIntValueAndSize(
        'Unknown2',
        virtualEntry.unknown2,
        Consts.USUAL_ENTRY_UNKNOWN2,
        'u32',
        path,
        mutErrors,
      );

      const framesResult = this.buildFrames(virtualEntry.frames, curPath, mutErrors);

      if (framesResult.kind === 'err') {
        return framesResult;
      }

      result.push({
        name: virtualEntry.name,
        unknown1: virtualEntry.unknown1,
        unknown2: virtualEntry.unknown2,
        frames: framesResult.result,
      });
    }

    return {
      kind: 'ok',
      result,
    };
  }

  private buildFrames(
    virtualFrames: readonly VirtualFrame<TFormat>[],
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ): Result<ValidatedGafFrame<TGafFormat, TWrapperKind>[], ValidatorFatalError> {
    if (virtualFrames.length === 0) {
      return {
        kind: 'err',
        error: {
          path,
          message: `List of frames is empty.`,
          nonFatalErrors: mutErrors,
        },
      };
    }

    const result: ValidatedGafFrame<TGafFormat, TWrapperKind>[] = [];

    for (let i = 0; i < virtualFrames.length; i++) {
      const virtualFrame = virtualFrames[i];

      const curPath: NodePath[] = [...path, { node: 'Frame', pos: i }];

      ValidatorUtils.validateIntSize('Duration', virtualFrame.duration, 'u32', path, mutErrors);

      const frameDataResult = this.buildFrameData(virtualFrame.frameData, curPath, mutErrors);

      if (frameDataResult.kind === 'err') {
        return frameDataResult;
      }

      result.push({
        duration: virtualFrame.duration,
        frameData: frameDataResult.result,
      });
    }

    return {
      kind: 'ok',
      result,
    };
  }

  private buildFrameData(
    virtualFrameData: VirtualFrameData<TFormat>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[]
  ): Result<ValidatedGafFrameData<TGafFormat, TWrapperKind>, ValidatorFatalError> {
    const curPath: NodePath[] = [...path, { node: 'Frame Data' }];

    return virtualFrameData.kind === 'single'
      ? this.buildFrameDataSingleLayer(virtualFrameData, curPath, mutErrors)
      : this.buildFrameDataMultiLayer(virtualFrameData, curPath, mutErrors);
  }

  private buildFrameDataSingleLayer(
    virtualFrameData: VirtualFrameDataSingleLayer<TFormat>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[]
  ): Result<ValidatedGafFrameDataSingleLayer<TGafFormat, TWrapperKind>, ValidatorFatalError> {
    const baseResult = this.buildBaseFrameData(virtualFrameData, path, mutErrors);

    if (baseResult.kind === 'err') {
      return baseResult;
    }

    const layerDataResult = this.buildLayerData(virtualFrameData, path, mutErrors);

    if (layerDataResult.kind === 'err') {
      return layerDataResult;
    }

    return {
      kind: 'ok',
      result: {
        ...baseResult.result,
        kind: 'single',
        layerData: layerDataResult.result,
      },
    };
  }

  private buildFrameDataMultiLayer(
    virtualFrameData: VirtualFrameDataMultiLayer<TFormat>,
    path: readonly NodePath[],
    mutErrors: ValidatorError[]
  ): Result<ValidatedGafFrameDataMultiLayer<TGafFormat, TWrapperKind>, ValidatorFatalError> {
    const baseResult = this.buildBaseFrameData(virtualFrameData, path, mutErrors);

    if (baseResult.kind === 'err') {
      return baseResult;
    }

    if (virtualFrameData.layers.length === 0) {
      return {
        kind: 'err',
        error: {
          path,
          message: `Multi-layered frame cannot have an empty list of subframes.`,
          nonFatalErrors: mutErrors,
        },
      };
    }

    const layers: ValidatedGafFrameDataSingleLayer<TGafFormat, TWrapperKind>[] = [];

    for (let i = 0; i < virtualFrameData.layers.length; i++) {
      const virtualLayer = virtualFrameData.layers[i];

      const curPath: NodePath[] = [...path, { node: 'Subframe', pos: i }];
      const layerResult = this.buildFrameDataSingleLayer(virtualLayer, curPath, mutErrors);

      if (layerResult.kind === 'err') {
        return layerResult;
      }

      layers.push(layerResult.result);
    }

    return {
      kind: 'ok',
      result: {
        ...baseResult.result,
        kind: 'multi',
        layers,
      },
    };
  }

  private buildBaseFrameData(
    virtualFrameData: BaseVirtualGafFrameData,
    path: readonly NodePath[],
    mutErrors: ValidatorError[]
  ): Result<LibGaf.BaseGafFrameData, ValidatorFatalError> {
    const { width, height, xOffset, yOffset, transparencyIndex, unknown2, unknown3 } = virtualFrameData;

    ValidatorUtils.validateIntSize('Width', width, 'u16', path, mutErrors);
    ValidatorUtils.validateIntSize('Height', height, 'u16', path, mutErrors);
    ValidatorUtils.validateIntSize('X offset', xOffset, 'i16', path, mutErrors);
    ValidatorUtils.validateIntSize('Y offset', yOffset, 'i16', path, mutErrors);
    ValidatorUtils.validateIntSize('Transparency index', transparencyIndex, 'u8', path, mutErrors);
    ValidatorUtils.validateIntSize('Unknown2', unknown2, 'u32', path, mutErrors);
    ValidatorUtils.validateIntSize('Unknown3', unknown3, 'u32', path, mutErrors);

    return {
      kind: 'ok',
      result: { width, height, xOffset, yOffset, transparencyIndex, unknown2, unknown3 },
    };
  }
}
