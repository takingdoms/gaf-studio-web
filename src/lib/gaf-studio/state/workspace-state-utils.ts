import { MainFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGafFromFile } from '@/lib/gaf-studio/state/current-gaf';
import { CurrentPalette } from '@/lib/gaf-studio/state/current-palette';
import { WorkspaceCursor } from '@/lib/gaf-studio/state/workspace-cursor';
import { WorkspaceState, WorkspaceStateGaf, WorkspaceStateTaf } from '@/lib/gaf-studio/state/workspace-state';
import { VirtualGaf } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { ColoredVirtualGafBuilder } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion/colored-virtual-gaf-builder';
import { PalettedVirtualGafBuilder } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf-conversion/paletted-virtual-gaf-builder';
import { CanvasedImageCompiler } from '@/lib/image/canvased-image-compiler';
import { Palette } from '@/lib/image/palette/palette';
import { FormatUtils } from '@/lib/utils/format-utils';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

// TODO refactor this entire mess
export namespace WorkspaceStateUtils {
  const canvasedImageCompiler = new CanvasedImageCompiler();

  async function readGafResult(fileData: Uint8Array): Promise<LibGaf.Reader.GafReaderResult> {
    try {
      return LibGaf.Reader.readFromBuffer(fileData);
    } catch (err) {
      throw new Error(`Failed to read gaf file.`); // TODO propagate err
    }
  }

  function makeEmptyVirtualGaf(): VirtualGaf {
    return {
      entries: [],
    };
  }

  async function loadCurrentGaf<T extends 'gaf'>
    (file: File, palette: Palette, format: T): Promise<CurrentGafFromFile<T>>;
  async function loadCurrentGaf<T extends 'taf'>
    (file: File, palette?: Palette, format?: T): Promise<CurrentGafFromFile<T>>;
  async function loadCurrentGaf<T extends MainFormat>
    (file: File, palette?: Palette, format?: T): Promise<CurrentGafFromFile<T>>
  {
    const fileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    const gafResult = await readGafResult(fileData);

    const detectedFormat = FormatUtils.detectFormatFromResult(gafResult.gaf);

    if (detectedFormat === null) {
      if (format === undefined) {
        throw new Error(`Could not automatically identify whether the file is a GAF or a TAF.`);
      }
    }
    else { // detectedFormat !== null
      if (format === undefined) {
        format = detectedFormat.mainFormat as T;
      }
      else if (format !== detectedFormat.mainFormat) {
        throw new Error(`Expected a "${format}" but got a "${detectedFormat.mainFormat}"`);
      }
    }

    let virtualGaf: VirtualGaf;

    if (format === 'gaf') {
      if (palette === undefined) {
        throw new Error(`No palette provided.`);
      }

      const builder = new PalettedVirtualGafBuilder(canvasedImageCompiler, palette);
      virtualGaf = builder.makeVirtualGaf(gafResult.gaf);
    } else {
      const builder = new ColoredVirtualGafBuilder(canvasedImageCompiler);
      virtualGaf = builder.makeVirtualGaf(gafResult.gaf);
    }

    return {
      kind: 'from-file',
      fileName,
      fileData,
      originalGaf: gafResult,
      compiledGaf: gafResult.gaf,
      virtualGaf,
    };
  }

  function emptyCursor(): DeepReadonly<WorkspaceCursor> {
    return {
      entryIndex: null,
      frameIndex: null,
      subframeIndex: null,
    };
  }

  export async function initFromAnyFile(
    file: File,
    defaultPalette: CurrentPalette,
  ): Promise<WorkspaceState> {
    const currentGaf = await loadCurrentGaf(file, defaultPalette.palette);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }

    if (detectedFormat.mainFormat === 'gaf') {
      return {
        format: 'gaf',
        currentGaf,
        currentPalette: defaultPalette,
        cursor: emptyCursor(),
      };
    }

    return {
      format: 'taf',
      // currentTaf1555: detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
      // currentTaf4444: detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      currentGafs: {
        'taf_1555': detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
        'taf_4444': detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      },
      activeSubFormat: detectedFormat.subFormat,
      cursor: emptyCursor(),
    };
  }

  export async function initFromGafFile(
    file: File,
    currentPalette: CurrentPalette,
  ): Promise<WorkspaceStateGaf> {
    const currentGaf = await loadCurrentGaf(file, currentPalette.palette);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat !== null && detectedFormat.mainFormat === 'taf') {
      throw new Error(`Expected a GAF, but got a TAF.`);
    }

    return {
      format: 'gaf',
      currentGaf,
      currentPalette,
      cursor: emptyCursor(),
    };
  }

  export async function initFromTafFile(file: File): Promise<WorkspaceStateTaf> {
    const currentGaf = await loadCurrentGaf(file);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }
    else if (detectedFormat.mainFormat === 'gaf') {
      throw new Error(`Expected a TAF, but got a GAF.`);
    }

    return {
      format: 'taf',
      // currentTaf1555: detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
      // currentTaf4444: detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      currentGafs: {
        'taf_1555': detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
        'taf_4444': detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      },
      activeSubFormat: detectedFormat.subFormat,
      cursor: emptyCursor(),
    };
  }

  export async function initFromTafPair(file1555: File, file4444: File): Promise<WorkspaceStateTaf> {
    const currentGaf1555 = await loadCurrentGaf(file1555);
    const currentGaf4444 = await loadCurrentGaf(file4444);

    const detectedFormat1555 = FormatUtils.detectFormatFromResult(currentGaf1555.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf1555.fileName);

    const detectedFormat4444 = FormatUtils.detectFormatFromResult(currentGaf4444.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf4444.fileName);

    if (detectedFormat1555?.mainFormat === 'gaf' || detectedFormat4444?.mainFormat === 'gaf') {
      throw new Error(`One of the files provided is a GAF instead of a TAF.`);
    }

    if (detectedFormat1555 === null && detectedFormat4444 === null) {
      throw new Error(`Couldn't detect the TAF subformat of any of the files provided.`);
    }

    if (detectedFormat1555 !== null && detectedFormat1555.subFormat === 'taf_4444') {
      throw new Error(`File provided as a taf_1555 is a taf_4444`);
    }

    if (detectedFormat4444 !== null && detectedFormat4444.subFormat === 'taf_1555') {
      throw new Error(`File provided as a taf_4444 is a taf_1555`);
    }

    return {
      format: 'taf',
      // currentTaf1555: currentGaf1555,
      // currentTaf4444: currentGaf4444,
      currentGafs: {
        'taf_1555': currentGaf1555,
        'taf_4444': currentGaf4444,
      },
      activeSubFormat: null,
      cursor: emptyCursor(),
    };
  }

  export function initBlank(format: 'gaf', defaultPalette: CurrentPalette): WorkspaceStateGaf;
  export function initBlank(format: 'taf', defaultPalette?: undefined): WorkspaceStateTaf;
  export function initBlank(format: MainFormat, defaultPalette?: CurrentPalette):
    WorkspaceStateGaf | WorkspaceStateTaf
  {
    if (format === 'gaf') {
      if (defaultPalette === undefined) {
        throw new Error(`No defaultPalette provided.`);
      }

      return {
        format,
        currentGaf: {
          kind: 'blank',
          compiledGaf: null,
          virtualGaf: makeEmptyVirtualGaf(),
        },
        currentPalette: defaultPalette,
        cursor: emptyCursor(),
      };
    }

    return {
      format,
      currentGafs: {
        'taf_1555': {
          kind: 'blank',
          compiledGaf: null,
          virtualGaf: makeEmptyVirtualGaf(),
        },
        'taf_4444': {
          kind: 'blank',
          compiledGaf: null,
          virtualGaf: makeEmptyVirtualGaf(),
        },
      },
      activeSubFormat: null,
      cursor: emptyCursor(),
    };
  }
}
