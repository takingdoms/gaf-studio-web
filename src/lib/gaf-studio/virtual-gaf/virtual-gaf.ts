import { PalettedImageResource, ColoredImageResource } from '@/lib/image/image-resource';
import LibGaf from 'lib-gaf';

export type VirtualGaf = {
  entries: VirtualGafEntry[];
};

export type VirtualGafEntry = {
  key: symbol;
  name: string;
  unknown1: number;
  unknown2: number;
  frames: VirtualGafFrame[];
};

export type VirtualGafFrame = {
  key: symbol;
  duration: number;
  frameData: VirtualGafFrameData;
};

export type VirtualGafFrameData = VirtualGafFrameDataSingleLayer | VirtualGafFrameDataMultiLayer;

export type BaseVirtualGafFrameData = LibGaf.BaseGafFrameData;

export type VirtualGafFrameDataSingleLayer = BaseVirtualGafFrameData & {
  key: symbol;
  kind: 'single';
  layerData: VirtualGafLayerData;
};

export type VirtualGafFrameDataMultiLayer = BaseVirtualGafFrameData & {
  kind: 'multi';
  layers: VirtualGafFrameDataSingleLayer[];
};

export type VirtualGafLayerData = VirtualGafLayerDataPaletteIndices | VirtualGafLayerDataRawColors;

export type VirtualGafLayerDataPaletteIndices = {
  kind: 'palette-idx';
  compress: boolean;
  wrappedImages: PalettedImageResource;
};

export type VirtualGafLayerDataRawColors = {
  kind: 'raw-colors';
  wrappedImages: ColoredImageResource;
};
