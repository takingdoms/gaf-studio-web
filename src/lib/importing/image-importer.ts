import { ImageResource } from "@/lib/image/image-resource";
import { DecodeError, DecodedUserImage } from "@/lib/importing/image-decoder";

export type ImportFormat = 'gaf' | 'taf_1555' | 'taf_4444' ;

export type ImporterResult<TResource extends ImageResource = ImageResource> = {
  readonly resource: TResource;
};

export type ImageImporter<
  TFormat extends ImportFormat,
  TConfig,
  TResult extends ImporterResult,
> = {
  readonly format: TFormat;
  readonly supportedFileExts: string[];
  readonly title: string;
  readonly createUserImage: (file: File) => Promise<DecodedUserImage | DecodeError>;
  readonly createResource: (decodedImage: DecodedUserImage, config: TConfig) =>
    Promise<ImporterResultWrapper<TResult>>;
};

export type ImporterResultWrapper<TResult extends ImporterResult> = {
  readonly kind: 'success';
  readonly result: TResult;
} | {
  readonly kind: 'warning';
  readonly result: TResult;
  readonly warning: string;
} | {
  readonly kind: 'error';
  readonly resource: null;
  readonly error: string;
};
