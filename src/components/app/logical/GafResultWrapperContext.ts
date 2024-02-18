import * as LibGaf from 'lib-gaf';
import React from 'react';

export type GafResultWrapper = {
  fileData: Uint8Array;
  gafResult: LibGaf.Reader.GafReaderResult;
};

export const GafResultWrapperContext
  = React.createContext<GafResultWrapper | undefined>(undefined);
