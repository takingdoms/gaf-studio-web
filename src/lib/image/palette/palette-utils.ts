import { Palette } from "@/lib/image/palette/palette";
import LibGaf from "lib-gaf";

// const EXPECTED_PCX_SIZE = 999; // TODO!
const RGB_DATA_LENGTH = 256 * 3; // 256 colors, 3 bytes per color

export namespace PaletteUtils {
  export async function loadFromPcxFile(file: File): Promise<Palette> {
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    return loadFromPcxFileData(fileData);
  }

  export function loadFromPcxFileData(data: Uint8Array): Palette {
    if (data.length < RGB_DATA_LENGTH) {
      throw new Error(`File is too small. Are you sure this is a .pcx file?`);
    }

    // if (data.length !== EXPECTED_PCX_SIZE) {
    //   throw new Error(`This is not a normal .pcx file. Expected length: 768. Got: ${data.length}`);
    // }

    const offset =  data.length - RGB_DATA_LENGTH;
    const rgbData = new Uint8Array(data.buffer, data.byteOffset + offset, RGB_DATA_LENGTH);

    return { rgbData };
  }

  export function createColorData(
    width: number,
    height: number,
    transparencyIndex: number,
    indices: Uint8Array,
    palette: Palette,
  ): LibGaf.ColorData<'rgba8888'> {
    if (indices.length !== width * height) {
      throw new Error(`indices.length !== width * height`);
    }

    const bytes = new Uint8Array(width * height * 4);

    for (let i = 0; i < indices.length; i++) {
      const nextIndex = indices[i];
      const pos = i * 4;

      if (nextIndex === transparencyIndex) {
        bytes[pos + 0] = 0;
        bytes[pos + 1] = 0;
        bytes[pos + 2] = 0;
        bytes[pos + 3] = 0;
        continue;
      }

      // commented because grayscale is now an actual built-in palette
      /*if (palette === null) { // grayscale
        bytes[pos + 0] = nextIndex;
        bytes[pos + 1] = nextIndex;
        bytes[pos + 2] = nextIndex;
        bytes[pos + 3] = 255;
        continue;
      }*/

      const paletteColors = palette.rgbData;
      const paletteOffset = nextIndex * 3;

      const red = paletteColors[paletteOffset + 0];
      const gre = paletteColors[paletteOffset + 1];
      const blu = paletteColors[paletteOffset + 2];

      bytes[pos + 0] = red;
      bytes[pos + 1] = gre;
      bytes[pos + 2] = blu;
      bytes[pos + 3] = 255;
    }

    return {
      format: 'rgba8888',
      bytes,
    };
  }
}
