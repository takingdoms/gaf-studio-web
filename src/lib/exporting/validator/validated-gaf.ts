import { Replace } from "@/lib/utils/utility-types";
import LibGaf from "lib-gaf";

/*
  These types exist to thinly wrap the LibGaf result tree with a type tree that ultimately leads
  to ValidatedGafLayerDataRawColorsPair which contains both taf data in one place.
*/

type GafFormat = LibGaf.GafFormat;
type WrapperKind = 'solo' | 'pair';

export type ValidatedGafResult<T extends GafFormat, K extends WrapperKind> =
  Replace<LibGaf.GafResult<T>, 'entries', ValidatedGafEntry<T, K>[]>;

export type ValidatedGafEntry<T extends GafFormat, K extends WrapperKind> =
  Replace<LibGaf.GafEntry<T>, 'frames', ValidatedGafFrame<T, K>[]>;

export type ValidatedGafFrame<T extends GafFormat, K extends WrapperKind> =
  Replace<LibGaf.GafFrame<T>, 'frameData', ValidatedGafFrameData<T, K>>;

export type ValidatedGafFrameData<T extends GafFormat, K extends WrapperKind> =
  | ValidatedGafFrameDataSingleLayer<T, K>
  | ValidatedGafFrameDataMultiLayer<T, K>;

export type ValidatedGafFrameDataSingleLayer<T extends GafFormat, K extends WrapperKind> =
  Replace<LibGaf.GafFrameDataSingleLayer<T>, 'layerData', ValidatedGafLayerData<T, K>>;

export type ValidatedGafFrameDataMultiLayer<T extends GafFormat, K extends WrapperKind> =
  Replace<LibGaf.GafFrameDataMultiLayer<T>, 'layers', ValidatedGafFrameDataSingleLayer<T, K>[]>;

export type ValidatedGafLayerData<T extends GafFormat, K extends WrapperKind> =
  T extends 'gaf' ? LibGaf.GafLayerDataPaletteIndices :
  T extends 'taf' ? ValidatedGafLayerDataRawColors<K> :
  never;

export type ValidatedGafLayerDataRawColors<K extends WrapperKind> =
  K extends 'solo' ? LibGaf.GafLayerDataRawColors :
  K extends 'pair' ? ValidatedGafLayerDataRawColorsPair :
  never;

type ValidatedGafLayerDataRawColorsPair = {
  data1555: LibGaf.GafLayerDataRawColors;
  data4444: LibGaf.GafLayerDataRawColors;
};
