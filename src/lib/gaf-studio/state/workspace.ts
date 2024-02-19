import { MainFormat } from '@/lib/gaf-studio/main-format';
import { CurrentGaf, CurrentGafFromFile } from '@/lib/gaf-studio/state/current-gaf';
import { FormatUtils } from '@/lib/utils/format-utils';
import * as LibGaf from 'lib-gaf';

export type WorkspaceBase<TFormat extends MainFormat> = {
  format: TFormat;
};

export type WorkspaceGaf = WorkspaceBase<'gaf'> & {
  currentGaf: CurrentGaf | null;
};

export type WorkspaceTaf = WorkspaceBase<'taf'> & {
  currentTaf1555: CurrentGaf | null;
  currentTaf4444: CurrentGaf | null;
};

export type Workspace =
  | WorkspaceGaf
  | WorkspaceTaf;

export namespace Workspace {
  async function readGafResult(fileData: Uint8Array): Promise<LibGaf.Reader.GafReaderResult> {
    try {
      return LibGaf.Reader.readFromBuffer(fileData);
    } catch (err) {
      throw new Error(`Failed to read gaf file.`); // TODO propagate err
    }
  }

  async function loadCurrentGaf(file: File): Promise<CurrentGafFromFile> {
    const fileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    const gafResult = await readGafResult(fileData);

    return {
      kind: 'from-file',
      fileName,
      fileData,
      gafResult,
    };
  }

  export async function initFromAnyFile(file: File): Promise<Workspace> {
    const currentGaf = await loadCurrentGaf(file);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.gafResult)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }

    if (detectedFormat.mainFormat === 'gaf') {
      return {
        format: 'gaf',
        currentGaf,
      };
    }

    return {
      format: 'taf',
      currentTaf1555: detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
      currentTaf4444: detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
    };
  }

  export async function initFromGafFile(file: File): Promise<WorkspaceGaf> {
    const currentGaf = await loadCurrentGaf(file);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.gafResult)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat !== null && detectedFormat.mainFormat === 'taf') {
      throw new Error(`Expected a GAF, but got a TAF.`);
    }

    return {
      format: 'gaf',
      currentGaf,
    };
  }

  export async function initFromTafFile(file: File): Promise<WorkspaceTaf> {
    const currentGaf = await loadCurrentGaf(file);

    const detectedFormat = FormatUtils.detectFormatFromResult(currentGaf.gafResult)
      ?? FormatUtils.detectFormatFromFileName(currentGaf.fileName);

    if (detectedFormat === null) {
      throw new Error(`Could not detect format from the file provided.`);
    }
    else if (detectedFormat.mainFormat === 'gaf') {
      throw new Error(`Expected a TAF, but got a GAF.`);
    }

    return {
      format: 'taf',
      currentTaf1555: detectedFormat.subFormat === 'taf_1555' ? currentGaf : null,
      currentTaf4444: detectedFormat.subFormat === 'taf_4444' ? currentGaf : null,
    };
  }

  export async function initFromTafPair(file1555: File, file4444: File): Promise<WorkspaceTaf> {
    const currentGaf1555 = await loadCurrentGaf(file1555);
    const currentGaf4444 = await loadCurrentGaf(file4444);

    const detectedFormat1555 = FormatUtils.detectFormatFromResult(currentGaf1555.gafResult)
      ?? FormatUtils.detectFormatFromFileName(currentGaf1555.fileName);

    const detectedFormat4444 = FormatUtils.detectFormatFromResult(currentGaf4444.gafResult)
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
      currentTaf1555: currentGaf1555,
      currentTaf4444: currentGaf4444,
    };
  }

  export function initBlank(format: MainFormat): Workspace {
    if (format === 'gaf') {
      return {
        format,
        currentGaf: {
          kind: 'blank',
          entries: [],
        },
      };
    }

    return {
      format,
      currentTaf1555: {
        kind: 'blank',
        entries: [],
      },
      currentTaf4444: {
        kind: 'blank',
        entries: [],
      },
    };
  }
}
