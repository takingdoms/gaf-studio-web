import { PalettedImageResource, ColoredImageResource } from '@/lib/image/image-resource';
import { MainFormat } from '@/lib/main-format';
import LibGaf from 'lib-gaf';

export type VirtualGaf<T extends MainFormat = MainFormat> = {
  readonly entries: readonly VirtualEntry<T>[];
};

export type VirtualEntry<T extends MainFormat = MainFormat> = {
  readonly key: symbol;
  readonly name: string;
  readonly unknown1: number;
  readonly unknown2: number;
  readonly frames: readonly VirtualFrame<T>[];
};

export type VirtualFrame<T extends MainFormat = MainFormat> = {
  readonly key: symbol;
  readonly duration: number;
  readonly frameData: VirtualFrameData<T>;
};

export type VirtualFrameData<T extends MainFormat = MainFormat> =
  | VirtualFrameDataSingleLayer<T>
  | VirtualFrameDataMultiLayer<T>;

export type BaseVirtualGafFrameData = Readonly<LibGaf.BaseGafFrameData>;

export type VirtualFrameDataSingleLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    readonly key: symbol;
    readonly kind: 'single';
    readonly layerData: VirtualLayerData<T>;
  };

export type VirtualFrameDataMultiLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    readonly kind: 'multi';
    readonly layers: readonly VirtualFrameDataSingleLayer<T>[];
  };

export type VirtualLayerData<T extends MainFormat = MainFormat> =
  T extends 'gaf' ? VirtualLayerDataPaletteIndices :
  T extends 'taf' ? VirtualLayerDataRawColors :
  never;

export type VirtualLayerDataPaletteIndices = {
  readonly kind: 'palette-idx';
  readonly compress: boolean;
  readonly imageResource: PalettedImageResource;
};

export type VirtualLayerDataRawColors = {
  readonly kind: 'raw-colors';
  readonly imageResource: ColoredImageResource;
};
