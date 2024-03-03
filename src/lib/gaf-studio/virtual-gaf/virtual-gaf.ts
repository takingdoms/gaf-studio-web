import { MainFormat } from '@/lib/gaf-studio/main-format';
import { PalettedImageResource, ColoredImageResource } from '@/lib/image/image-resource';
import LibGaf from 'lib-gaf';

export type VirtualGaf<T extends MainFormat = MainFormat> = {
  entries: VirtualGafEntry<T>[];
};

export type VirtualGafEntry<T extends MainFormat = MainFormat> = {
  key: symbol;
  name: string;
  unknown1: number;
  unknown2: number;
  frames: VirtualGafFrame<T>[];
};

export type VirtualGafFrame<T extends MainFormat = MainFormat> = {
  key: symbol;
  duration: number;
  frameData: VirtualGafFrameData<T>;
};

export type VirtualGafFrameData<T extends MainFormat = MainFormat> =
  | VirtualGafFrameDataSingleLayer<T>
  | VirtualGafFrameDataMultiLayer<T>;

export type BaseVirtualGafFrameData = LibGaf.BaseGafFrameData;

export type VirtualGafFrameDataSingleLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    key: symbol;
    kind: 'single';
    layerData: VirtualGafLayerData<T>;
  };

export type VirtualGafFrameDataMultiLayer<T extends MainFormat = MainFormat> =
  BaseVirtualGafFrameData & {
    kind: 'multi';
    layers: VirtualGafFrameDataSingleLayer<T>[];
  };

export type VirtualGafLayerData<T extends MainFormat = MainFormat> =
  T extends 'gaf' ? VirtualGafLayerDataPaletteIndices :
  T extends 'taf' ? VirtualGafLayerDataRawColors :
  never;

export type VirtualGafLayerDataPaletteIndices = {
  kind: 'palette-idx';
  compress: boolean;
  imageResource: PalettedImageResource;
};

export type VirtualGafLayerDataRawColors = {
  kind: 'raw-colors';
  imageResource: ColoredImageResource;
};
