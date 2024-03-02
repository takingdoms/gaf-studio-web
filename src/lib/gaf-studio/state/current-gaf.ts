import { VirtualGaf } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import LibGaf from 'lib-gaf';

export type BaseCurrentGaf = {
  virtualGaf: VirtualGaf; // this is what the user actually mutates on each operation
  compiledGaf: LibGaf.GafResult | null; // null = hasn't yet been compiled
};

export type CurrentGaf =
  | CurrentGafFromFile
  | CurrentGafFromBlank;

export type CurrentGafFromFile = BaseCurrentGaf & {
  kind: 'from-file';
  fileName: string;
  fileData: Uint8Array;
  originalGaf: LibGaf.Reader.GafReaderResult; // .gaf can be === compiledGaf (on first load!)
};

export type CurrentGafFromBlank = BaseCurrentGaf & {
  kind: 'blank';
};
