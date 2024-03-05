import { MainFormat } from '@/lib/gaf-studio/main-format';
import { VirtualGaf } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { ReadonlyUint8Array } from '@/lib/utils/utility-types';
import LibGaf from 'lib-gaf';

export type BaseCurrentGaf<T extends MainFormat> = {
  readonly virtualGaf: VirtualGaf<T>; // this is what the user actually mutates on each operation
  readonly compiledGaf: LibGaf.GafResult<T> | null; // null = hasn't yet been compiled
};

export type CurrentGaf =
  | CurrentGafFromFile
  | CurrentGafFromBlank;

export type CurrentGafFromFile<T extends MainFormat = MainFormat> = BaseCurrentGaf<T> & {
  readonly kind: 'from-file';
  readonly fileName: string;
  readonly fileData: ReadonlyUint8Array;
  readonly originalGaf: LibGaf.Reader.GafReaderResult; // .gaf can be === compiledGaf (on first load!)
};

export type CurrentGafFromBlank<T extends MainFormat = MainFormat> = BaseCurrentGaf<T> & {
  readonly kind: 'blank';
};
