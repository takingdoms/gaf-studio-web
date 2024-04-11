import { SimpleImageCompiler } from "@/lib/image/compiler/simple-image-compiler";
import { TafSubFormat } from "@/lib/main-format";
import { CurrentGaf, CurrentGafFromFile } from "@/lib/state/gaf-studio/current-gaf";
import { CurrentPalette } from "@/lib/state/gaf-studio/current-palette";
import { FormatUtils } from "@/lib/utils/format-utils";
import { Result } from "@/lib/utils/result";
import { VirtualGafMakerForGaf } from "@/lib/virtual-gaf/virtual-gaf-conversion/virtual-gaf-maker-for-gaf";
import { VirtualGafMakerForTafPair } from "@/lib/virtual-gaf/virtual-gaf-conversion/virtual-gaf-maker-for-taf-pair";
import { VirtualGafMakerForTafSolo } from "@/lib/virtual-gaf/virtual-gaf-conversion/virtual-gaf-maker-for-taf-solo";
import { WorkspaceInitError, WorkspaceInitResult, WorkspaceInitResultSuccess } from "@/lib/workspace-state-initializer/workspace-init-result";
import LibGaf from "@takingdoms/lib-gaf";

export namespace WorkspaceStateInitializer {
  const imageCompiler = new SimpleImageCompiler();

  export function initBlankGaf(defaultPalette: CurrentPalette): WorkspaceInitResultSuccess<'gaf'> {
    const initialGaf: CurrentGaf<'gaf'> = {
      kind: 'blank',
      format: 'gaf',
      compiledGaf: null,
      virtualGaf: { entries: [] },
    };

    return {
      kind: 'success',
      configWrapper: {
        format: 'gaf',
        config: {
          initialGaf,
          initialPalette: defaultPalette,
        },
      },
    };
  }

  export function initBlankTafPair(): WorkspaceInitResultSuccess<'taf-pair'> {
    const initialGaf: CurrentGaf<'taf-pair'> = {
      kind: 'blank',
      format: 'taf-pair',
      compiledGafs: null,
      virtualGaf: { entries: [] },
    };

    return {
      kind: 'success',
      configWrapper: {
        format: 'taf-pair',
        config: {
          initialGaf,
        },
      },
    };
  }

  export async function initFromFileGaf(
    file: File,
    currentPalette: CurrentPalette,
  ): Promise<WorkspaceInitResult<'gaf'>> {
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    let gafResult: LibGaf.Reader.GafReaderResult;

    try {
      gafResult = await readGafResult(fileData);
    } catch (error) {
      return {
        kind: 'error-reading-gaf',
        error,
      };
    }

    const detectedFormat = FormatUtils.detectFormatFromResultOrFileName(gafResult.gaf, file.name);

    if (detectedFormat !== null && detectedFormat.mainFormat !== 'gaf') {
      return {
        kind: 'invalid-format',
        detectedFormat,
      };
    }

    const virtualGafMaker = new VirtualGafMakerForGaf(currentPalette.palette, imageCompiler);
    const virtualGaf = virtualGafMaker.makeVirtualGaf(gafResult.gaf);

    const initialGaf: CurrentGafFromFile<'gaf'> = {
      kind: 'from-file-single',
      fileName: file.name,
      fileData,
      originalGaf: gafResult,
      format: 'gaf',
      virtualGaf,
      compiledGaf: gafResult.gaf,
    };

    return {
      kind: 'success',
      configWrapper: {
        format: 'gaf',
        config: {
          initialGaf,
          initialPalette: currentPalette,
        },
      },
    };
  }

  export async function initFromFileTafSolo(
    file: File,
    manualSubFormat?: TafSubFormat,
  ): Promise<WorkspaceInitResult<'taf-solo'>> {
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    let gafResult: LibGaf.Reader.GafReaderResult;

    try {
      gafResult = await readGafResult(fileData);
    } catch (error) {
      return {
        kind: 'error-reading-gaf',
        error,
      };
    }

    const detectedFormat = FormatUtils.detectFormatFromResultOrFileName(gafResult.gaf, file.name);

    let subFormat: TafSubFormat;

    if (detectedFormat !== null) {
      if (detectedFormat.mainFormat !== 'taf') {
        return {
          kind: 'invalid-format',
          detectedFormat,
        };
      }

      if (manualSubFormat !== undefined && detectedFormat.subFormat !== manualSubFormat) {
        return {
          kind: 'invalid-format',
          detectedFormat,
        };
      }

      subFormat = detectedFormat.subFormat;
    }
    else {
      if (manualSubFormat === undefined) {
        return {
          kind: 'error-other',
          message: `Couldn't detect whether the file provided is a _1555 or _4444 taf file.`,
        };
      }

      subFormat = manualSubFormat;
    }

    const virtualGafMaker = new VirtualGafMakerForTafSolo(imageCompiler);
    const virtualGaf = virtualGafMaker.makeVirtualGaf(gafResult.gaf);

    const initialGaf: CurrentGafFromFile<'taf-solo'> = {
      kind: 'from-file-single',
      fileName: file.name,
      fileData,
      originalGaf: gafResult,
      format: 'taf-solo',
      virtualGaf,
      compiledGaf: gafResult.gaf,
    };

    return {
      kind: 'success',
      configWrapper: {
        format: 'taf-solo',
        config: {
          initialGaf,
          subFormat,
        },
      },
    };
  }

  export async function initFromFileTafPair(file1555: File, file4444: File):
    Promise<WorkspaceInitResult<'taf-pair'>>
  {
    const tafStuff1555 = await prepareTaf(file1555, 'taf_1555');
    if (tafStuff1555.kind === 'err') return tafStuff1555.error;

    const tafStuff4444 = await prepareTaf(file4444, 'taf_4444');
    if (tafStuff4444.kind === 'err') return tafStuff4444.error;

    const { fileData: fileData1555, gafResult: gafResult1555 } = tafStuff1555.result;
    const { fileData: fileData4444, gafResult: gafResult4444 } = tafStuff4444.result;

    const virtualGafMaker = new VirtualGafMakerForTafPair(imageCompiler);
    const virtualPairResult = virtualGafMaker.makeVirtualGaf(gafResult1555.gaf, gafResult4444.gaf);

    if (virtualPairResult.kind === 'err') {
      return {
        kind: 'tafs-out-of-sync',
        error: virtualPairResult.error,
      };
    }

    const virtualGaf = virtualPairResult.result.virtualGaf;

    const initialGaf: CurrentGafFromFile<'taf-pair'> = {
      kind: 'from-file-pair',
      data1555: {
        fileName: file1555.name,
        fileData: fileData1555,
        originalGaf: gafResult1555,
      },
      data4444: {
        fileName: file4444.name,
        fileData: fileData4444,
        originalGaf: gafResult4444,
      },
      format: 'taf-pair',
      virtualGaf,
      compiledGafs: {
        taf1555: gafResult1555.gaf,
        taf4444: gafResult4444.gaf,
      },
    }

    return {
      kind: 'success',
      configWrapper: {
        format: 'taf-pair',
        config: {
          initialGaf,
        },
      },
    };
  }

  type OkPrepareResult = { fileData: Uint8Array; gafResult: LibGaf.Reader.GafReaderResult };

  async function prepareTaf(
    file: File,
    subFormat: TafSubFormat,
  ): Promise<Result<OkPrepareResult, WorkspaceInitError>> {
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    let gafResult: LibGaf.Reader.GafReaderResult;

    try {
      gafResult = await readGafResult(fileData);
    } catch (error) {
      return {
        kind: 'err',
        error: {
          kind: 'error-reading-gaf',
          which: subFormat,
          message: `Error reading the ${subFormat} file.`,
          error,
        },
      };
    }

    const detectedFormat = FormatUtils.detectFormatFromResultOrFileName(
      gafResult.gaf,
      file.name,
    );

    if (detectedFormat !== null) {
      if (detectedFormat.mainFormat !== 'taf' || detectedFormat.subFormat !== subFormat) {
        return {
          kind: 'err',
          error: {
            kind: 'invalid-format',
            which: subFormat,
            detectedFormat: detectedFormat,
          },
        };
      }
    }

    return {
      kind: 'ok',
      result: { fileData, gafResult },
    };
  }

  async function readGafResult(fileData: Uint8Array): Promise<LibGaf.Reader.GafReaderResult> {
    try {
      return LibGaf.Reader.readFromBuffer(fileData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
