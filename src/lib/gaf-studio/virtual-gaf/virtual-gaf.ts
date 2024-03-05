import { MainFormat } from '@/lib/gaf-studio/main-format';
import { PalettedImageResource, ColoredImageResource } from '@/lib/image/image-resource';
import LibGaf from 'lib-gaf';

export type VirtualGaf<T extends MainFormat = MainFormat> = {
  readonly entries: readonly VirtualGafEntry<T>[];
};

export type VirtualGafEntry<T extends MainFormat = MainFormat> = {
  readonly key: symbol;
  readonly name: string;
  readonly unknown1: number;
  readonly unknown2: number;
  readonly frames: readonly VirtualGafFrame<T>[];
};

export type VirtualGafFrame<T extends MainFormat = MainFormat> = {
  readonly key: symbol;
  readonly duration: number;
  readonly frameData: VirtualGafFrameData<T>;
};

export type VirtualGafFrameData<T extends MainFormat = MainFormat> =
  | VirtualGafFrameDataSingleLayer<T>
  | VirtualGafFrameDataMultiLayer<T>;

export type BaseVirtualGafFrameData = Readonly<LibGaf.BaseGafFrameData>;

export type VirtualGafFrameDataSingleLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    readonly key: symbol;
    readonly kind: 'single';
    readonly layerData: VirtualGafLayerData<T>;
  };

export type VirtualGafFrameDataMultiLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    readonly kind: 'multi';
    readonly layers: readonly VirtualGafFrameDataSingleLayer<T>[];
  };

export type VirtualGafLayerData<T extends MainFormat = MainFormat> =
  T extends 'gaf' ? VirtualGafLayerDataPaletteIndices :
  T extends 'taf' ? VirtualGafLayerDataRawColors :
  never;

export type VirtualGafLayerDataPaletteIndices = {
  readonly kind: 'palette-idx';
  readonly compress: boolean;
  readonly imageResource: PalettedImageResource;
};

export type VirtualGafLayerDataRawColors = {
  readonly kind: 'raw-colors';
  readonly imageResource: ColoredImageResource;
};
