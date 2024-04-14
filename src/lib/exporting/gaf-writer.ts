import { Result } from "@/lib/utils/result";
import LibGaf from "@takingdoms/lib-gaf";

export type WriterResultSingle = {
  kind: 'single';
  buffer: Uint8Array;
};

export type WriterResultTafPair = {
  kind: 'taf-pair';
  buffer1555: Uint8Array;
  buffer4444: Uint8Array;
};

export type WriterResult<T> = T extends 'taf-pair' ? WriterResultTafPair : WriterResultSingle;

export type WriterError = {
  errorMsg: string;
};

export const WRITE_RESULT_SINGLE = (
  gaf: LibGaf.GafResult,
): Result<WriterResultSingle, WriterError> => {
  try {
    return {
      kind: 'ok',
      ok: {
        kind: 'single',
        buffer: LibGaf.Writer.writeToBuffer(gaf).buffer,
      },
    };
  } catch (err) {
    return {
      kind: 'err',
      err: {
        errorMsg: err + '',
      },
    };
  }
};

export const WRITE_RESULT_PAIR = (
  gaf1555: LibGaf.GafResult,
  gaf4444: LibGaf.GafResult,
): Result<WriterResultTafPair, WriterError> => {
  try {
    return {
      kind: 'ok',
      ok: {
        kind: 'taf-pair',
        buffer1555: LibGaf.Writer.writeToBuffer(gaf1555).buffer,
        buffer4444: LibGaf.Writer.writeToBuffer(gaf4444).buffer,
      },
    };
  } catch (err) {
    return {
      kind: 'err',
      err: {
        errorMsg: err + '',
      },
    };
  }
};
