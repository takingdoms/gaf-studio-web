import LibGaf from "lib-gaf";
import * as png from '@stevebel/png';

export namespace ImageUtils {
  export async function pngFileToColorData(pngFile: File): Promise<LibGaf.ColorData<'rgba8888'>> {
    return pngBufferToColorData(await pngFile.arrayBuffer());
  }

  export function pngBufferToColorData(pngBuffer: ArrayBuffer): LibGaf.ColorData<'rgba8888'> {
    const metadata = png.decode(pngBuffer);
    const data = metadata.data;

    const bytes = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i += 4) {
      bytes[i + 0] = data[i + 0]; // red
      bytes[i + 1] = data[i + 1]; // green
      bytes[i + 2] = data[i + 2]; // blue
      bytes[i + 3] = data[i + 3]; // alpha
    }

    return {
      format: 'rgba8888',
      bytes,
    };
  }
}
