import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";

type CurrentTafsOnly1555 = {
  readonly 'taf_1555': CurrentGaf;
  readonly 'taf_4444': null;
};

type CurrentTafsOnly4444 = {
  readonly 'taf_1555': null;
  readonly 'taf_4444': CurrentGaf;
};

export type CurrentTafsBoth = {
  readonly 'taf_1555': CurrentGaf;
  readonly 'taf_4444': CurrentGaf;
};

// either format (never both at the same time)
export type CurrentTafsEither = CurrentTafsOnly1555 | CurrentTafsOnly4444;

export type CurrentTafs =
  | CurrentTafsOnly1555
  | CurrentTafsOnly4444
  | CurrentTafsBoth;
