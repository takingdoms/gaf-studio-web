import { ImageDecoder } from "@/lib/importing/image-decoder";
import * as png from '@stevebel/png';

export const PNG_IMAGE_DECODER: ImageDecoder = {
  supportedFileExts: ['png'],
  decodeFile: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pngMetadata = png.decode(arrayBuffer);
      const { data, width, height } = pngMetadata;

      const bytes = new Uint8Array(data.length);

      for (let i = 0; i < data.length; i++) {
        bytes[i + 0] = data[i + 0]; // red
        bytes[i + 1] = data[i + 1]; // green
        bytes[i + 2] = data[i + 2]; // blue
        bytes[i + 3] = data[i + 3]; // alpha
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
