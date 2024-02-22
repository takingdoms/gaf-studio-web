import * as LibGaf from 'lib-gaf';

export type CurrentGaf =
  | CurrentGafFromFile
  | CurrentGafFromBlank;

export type CurrentGafFromFile = {
  kind: 'from-file';
  fileName: string;
  fileData: Uint8Array;
  gafResult: LibGaf.Reader.GafReaderResult;
};

export type CurrentGafFromBlank = {
  kind: 'blank';
  entries: LibGaf.GafEntry[];
};
