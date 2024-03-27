import { SimpleImageCompiler } from '@/lib/image/compiler/simple-image-compiler';
import { Palette } from '@/lib/image/palette/palette';
import { MainFormat } from '@/lib/main-format';
import { CurrentGaf, CurrentGafFromFile } from '@/lib/state/gaf-studio/current-gaf';
import { CurrentTafs } from '@/lib/state/gaf-studio/current-tafs';
import { CurrentPalette } from '@/lib/state/gaf-studio/current-palette';
import { WorkspaceCursor } from '@/lib/state/gaf-studio/workspace-cursor';
import { FormatUtils } from '@/lib/utils/format-utils';
import { VirtualGaf } from '@/lib/virtual-gaf/virtual-gaf';
import { ColoredVirtualGafBuilder } from '@/lib/virtual-gaf/virtual-gaf-conversion/colored-virtual-gaf-builder';
import { PalettedVirtualGafBuilder } from '@/lib/virtual-gaf/virtual-gaf-conversion/paletted-virtual-gaf-builder';
import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import { TafSoloWorkspaceConfig } from '@/lib/state/workspace/taf-solo/create-taf-solo-workspace';
import { TafPairWorkspaceConfig } from '@/lib/state/workspace/taf-pair/create-taf-pair-workspace';

const BLANK_CURRENT_GAF: CurrentGaf = {
  kind: 'blank',
  compiledGaf: null,
  virtualGaf: {
    entries: [],
  },
};


// TODO refactor this entire mess
export namespace WorkspaceStateUtils {
  const imageCompiler = new SimpleImageCompiler();

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

      const builder = new PalettedVirtualGafBuilder(imageCompiler, palette);
      virtualGaf = builder.makeVirtualGaf(gafResult.gaf);
    } else {
      const builder = new ColoredVirtualGafBuilder(imageCompiler);
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
  ): Promise<WorkspaceConfigWrapper> {
    const currentGaf = await loadCurrentGaf(file, defaultPalette.palette);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }

    if (detectedFormat.mainFormat === 'gaf') {
      return {
        format: 'gaf',
        config: {
          initialGaf: currentGaf,
          initialPalette: defaultPalette,
        },
      };
    }

    throw new Error(`Tafs not supported yet`);

    /*return {
      format: 'taf',
      initialGafs: {
        'taf_1555': detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
        'taf_4444': detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      } as CurrentTafs,
      initialSubFormat: detectedFormat.subFormat,
    };*/
  }

  export async function initFromGafFile(
    file: File,
    currentPalette: CurrentPalette,
  ): Promise<WorkspaceConfigWrapper> {
    const currentGaf = await loadCurrentGaf(file, currentPalette.palette);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat !== null && detectedFormat.mainFormat === 'taf') {
      throw new Error(`Expected a GAF, but got a TAF.`);
    }

    return {
      format: 'gaf',
      config: {
        initialGaf: currentGaf,
        initialPalette: currentPalette,
      },
    };
  }

  export async function initFromTafFile(file: File): Promise<WorkspaceConfigWrapper> {
    const currentGaf = await loadCurrentGaf(file);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.originalGaf.gaf)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }
    else if (detectedFormat.mainFormat === 'gaf') {
      throw new Error(`Expected a TAF, but got a GAF.`);
    }

    throw new Error(`Tafs not yet supported.`);

    /*return {
      format: 'taf',
      // currentTaf1555: detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
      // currentTaf4444: detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      initialGafs: {
        'taf_1555': detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
        'taf_4444': detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
      } as CurrentTafs,
      initialSubFormat: detectedFormat.subFormat,
    };*/
  }

  export async function initFromTafPair(file1555: File, file4444: File): Promise<TafPairWorkspaceConfig> {
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
      initialGaf1555: currentGaf1555,
      initialGaf4444: currentGaf4444,
    };
  }

  /*export function initBlank(format: 'gaf', defaultPalette: CurrentPalette): GafWorkspaceSliceConfig;
  export function initBlank(format: 'taf', defaultPalette?: undefined): TafWorkspaceSliceConfig;
  export function initBlank(format: MainFormat, defaultPalette?: CurrentPalette):
    GafWorkspaceSliceConfig | TafWorkspaceSliceConfig
  {
    if (format === 'gaf') {
      if (defaultPalette === undefined) {
        throw new Error(`No defaultPalette provided.`);
      }

      return {
        format,
        initialGaf: {
          kind: 'blank',
          compiledGaf: null,
          virtualGaf: makeEmptyVirtualGaf(),
        },
        initialPalette: defaultPalette,
      };
    }

    return {
      format,
      initialGafs: {
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
      initialSubFormat: 'taf_1555',
    };
  }*/
}
