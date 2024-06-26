import { TafSubFormat } from '@/lib/main-format';
import LibGaf from '@takingdoms/lib-gaf';

export type DetectedFormat = {
  readonly mainFormat: 'gaf';
} | {
  readonly mainFormat: 'taf';
  readonly subFormat: TafSubFormat;
};

export namespace FormatUtils {
  export function hex(num: number): string {
    return '0x' + num.toString(16).toUpperCase();
  }

  export function getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
  }

  export function detectFormatFromResultOrFileName(
    gaf: LibGaf.GafResult,
    fileName: string,
  ): DetectedFormat | null {
    return detectFormatFromResult(gaf) ?? detectFormatFromFileName(fileName);
  }

  export function detectFormatFromFileName(fileName: string): DetectedFormat | null {
    const parts = fileName.split('.');
    const baseName = parts[0];
    const ext = parts[parts.length - 1];

    if (ext === 'gaf') {
      return { mainFormat: 'gaf' };
    }

    if (ext !== 'taf') {
      return null;
    }

    if (baseName.endsWith('_1555')) {
      return { mainFormat: 'taf', subFormat: 'taf_1555' };
    }

    if (baseName.endsWith('_4444')) {
      return { mainFormat: 'taf', subFormat: 'taf_4444' };
    }

    return null;
  }

  /** Returns null if there's no frame to infer format information. */
  export function detectFormatFromResult(gaf: LibGaf.GafResult): DetectedFormat | null {
    for (const entry of gaf.entries) {
      for (const frame of entry.frames) {
        const result = detectFrameDataFormat(frame.frameData);

        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  function detectFrameDataFormat(frameData: LibGaf.GafFrameData): DetectedFormat | null {
    if (frameData.kind === 'single') {
      if (frameData.layerData.kind === 'palette-idx') {
        return { mainFormat: 'gaf' };
      }

      return {
        mainFormat: 'taf',
        subFormat: frameData.layerData.colorData.format === 'argb1555' ? 'taf_1555' : 'taf_4444',
      };
    }

    for (const sub of frameData.layers) {
      const result = detectFrameDataFormat(sub);

      if (result !== null) {
        return result;
      }
    }

    return null;
  }
}
