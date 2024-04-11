import { MainFormat } from '@/lib/main-format';
import { ReadonlyUint8Array } from '@/lib/utils/utility-types';
import { VirtualGaf } from '@/lib/virtual-gaf/virtual-gaf';
import LibGaf from '@takingdoms/lib-gaf';

export type CurrentGaf<T extends MainFormat = MainFormat> =
  | CurrentGafFromFile<T>
  | CurrentGafFromBlank<T>;

export type BaseCurrentGaf<T extends MainFormat> =
  T extends 'gaf'       ? BaseCurrentGafForGaf :
  T extends 'taf-solo'  ? BaseCurrentGafForTafSolo :
  T extends 'taf-pair'  ? BaseCurrentGafForTafPair :
  never;

export type BaseCurrentGafForGaf = {
  readonly format: 'gaf';
  readonly virtualGaf: VirtualGaf<'gaf'>; // this is what the user actually mutates
  readonly compiledGaf: LibGaf.GafResult<'gaf'> | null; // null = hasn't yet been compiled
};

export type BaseCurrentGafForTafSolo = {
  readonly format: 'taf-solo';
  readonly virtualGaf: VirtualGaf<'taf-solo'>; // this is what the user actually mutates
  readonly compiledGaf: LibGaf.GafResult<'taf'> | null; // null = hasn't yet been compiled
};

export type BaseCurrentGafForTafPair = {
  readonly format: 'taf-pair';
  readonly virtualGaf: VirtualGaf<'taf-pair'>; // this is what the user actually mutates
  readonly compiledGafs: {
    taf1555: LibGaf.GafResult<'taf'>;
    taf4444: LibGaf.GafResult<'taf'>;
  } | null; // null = hasn't yet been compiled
};

export type CurrentGafFromFile<T extends MainFormat> =
  T extends 'gaf' | 'taf-solo'  ? CurrentGafFromFileSingular<T> :
  T extends 'taf-pair'          ? CurrentGafFromFilePair<T> :
  never;

export type CurrentGafFromFileSingular<T extends MainFormat> = BaseCurrentGaf<T> & {
  readonly kind: 'from-file-single';
} & CurrentGafFromFileData;

export type CurrentGafFromFilePair<T extends MainFormat> = BaseCurrentGaf<T> & {
  readonly kind: 'from-file-pair';
  readonly data1555: CurrentGafFromFileData;
  readonly data4444: CurrentGafFromFileData;
};

export type CurrentGafFromFileData = {
  readonly fileName: string;
  readonly fileData: ReadonlyUint8Array;
  readonly originalGaf: LibGaf.Reader.GafReaderResult; // .gaf can be === compiledGaf (on first load!)
};

export type CurrentGafFromBlank<T extends MainFormat> = BaseCurrentGaf<T> & {
  readonly kind: 'blank';
};
