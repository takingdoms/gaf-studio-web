import { CurrentGaf } from "@/lib/state/gaf-studio/current-gaf";

type CurrentGafOnly1555 = {
  readonly 'taf_1555': CurrentGaf;
  readonly 'taf_4444': null;
};

type CurrentGafOnly4444 = {
  readonly 'taf_1555': null;
  readonly 'taf_4444': CurrentGaf;
};

type CurrentGafBoth = {
  readonly 'taf_1555': CurrentGaf;
  readonly 'taf_4444': CurrentGaf;
};

export type CurrentGafs =
  | CurrentGafOnly1555
  | CurrentGafOnly4444
  | CurrentGafBoth;
