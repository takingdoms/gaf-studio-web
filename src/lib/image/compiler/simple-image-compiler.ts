import { ImageCompiler } from "@/lib/image/compiler/image-compiler";
import { ActualImage } from "@/lib/image/image-resource";
import LibGaf from "@takingdoms/lib-gaf";

export class SimpleImageCompiler implements ImageCompiler {
  compileImage(
    width: number,
    height: number,
    data: LibGaf.ColorData<'rgba8888'>,
  ): ActualImage {
    if (data.bytes.length !== width * height * 4) {
      throw new Error(`Dimension doesn't match with expected byte length.`);
    }

    const clampedBytes = new Uint8ClampedArray(
      data.bytes.buffer,
      data.bytes.byteOffset,
      data.bytes.byteLength,
    );

    return new ImageData(clampedBytes, width, height);
  }
}
