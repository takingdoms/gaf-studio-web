import { ActualImage } from "@/lib/image/image-resource";
import LibGaf from "@takingdoms/lib-gaf";

export type ImageDecoder = {
  readonly supportedFileExts: string[];
  readonly decodeFile: (file: File) => Promise<DecodedUserImage | DecodeError>;
};

export type DecodedUserImage = {
  colorData: LibGaf.ColorData<'rgba8888'>;
  image: ActualImage;
  metadata: DecodedImageMetadata;
};

export type DecodedImageMetadata = {
  width: number;
  height: number;
  diagnostics: 'TODO';
};

export type DecodeError = {
  error: string;
};
