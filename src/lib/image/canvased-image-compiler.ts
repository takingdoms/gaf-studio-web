import { ImageCompiler } from "@/lib/image/image-compiler";
import { ActualImage } from "@/lib/image/image-resource";
import LibGaf from "lib-gaf";

export class CanvasedImageCompiler implements ImageCompiler {
  compileImage(
    width: number,
    height: number,
    data: LibGaf.ColorData<'rgba8888'>,
  ): ActualImage {
    if (data.bytes.length !== width * height * 4) {
      throw new Error(`Dimension doesn't match with expected byte length.`);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(data.bytes);

    ctx.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL('image/png', 1);

    /*const img = new Image();
    img.src = dataURL;

    return img;*/
    return dataURL;
  }
}
