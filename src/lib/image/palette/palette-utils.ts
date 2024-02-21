import { Palette } from "@/lib/image/palette/palette";

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
}
