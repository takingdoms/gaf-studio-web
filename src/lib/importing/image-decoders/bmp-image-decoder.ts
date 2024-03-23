import { Debug } from "@/lib/debug/debug";
import { ImageDecoder } from "@/lib/importing/image-decoder";
import bmp from 'bmp-ts';

export const BMP_IMAGE_DECODER: ImageDecoder = {
  supportedFileExts: ['bmp'],
  decodeFile: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const bmpData = bmp.decode(buffer, { toRGBA: false });

      const hasAlpha = bmpData.bitPP === 32 && 'maskAlpha' in bmpData;

      const { data, width, height } = bmpData;

      Debug.assertEq(width * height * 4, data.length);

      const bytes = new Uint8Array(data.length);

      for (let i = 0; i < width * height; i++) {
        bytes[i * 4 + 0] = data[i * 4 + 3]; // red
        bytes[i * 4 + 1] = data[i * 4 + 2]; // green
        bytes[i * 4 + 2] = data[i * 4 + 1]; // blue
        bytes[i * 4 + 3] = hasAlpha ? data[i * 4 + 0] : 255; // alpha
      }

      const clamped = new Uint8ClampedArray(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const imageData = new ImageData(clamped, width, height);

      return {
        colorData: {
          format: 'rgba8888',
          bytes,
        },
        image: imageData,
        metadata: {
          width,
          height,
          diagnostics: 'TODO',
        },
      };
    } catch (err) {
      return {
        error: 'Unknown error: ' + err,
      };
    }
  },
};
