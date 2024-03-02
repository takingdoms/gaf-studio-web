import { ActualImage } from "@/lib/image/image-resource";
import LibGaf from "lib-gaf";

export type CompileImage = (
  width: number,
  height: number,
  data: LibGaf.ColorData<'rgba8888'>,
) => ActualImage;

export interface ImageCompiler {
  compileImage: CompileImage;
}
