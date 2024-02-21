import { ElementOf } from 'ts-essentials';

/*
  Note: Every TAF is a GAF, but not every GAF is a TAF.
  In other words, TAF is a subset of GAF.
*/

export const MAIN_FORMATS = [
  'gaf',
  'taf',
] as const satisfies string[];

export type MainFormat = ElementOf<typeof MAIN_FORMATS>;

export const TAF_SUB_FORMATS = [
  'taf_1555',
  'taf_4444',
] as const satisfies string[];

export type TafSubFormat = ElementOf<typeof TAF_SUB_FORMATS>;

export const TAF_SUB_FORMAT_TO_LABEL: Record<TafSubFormat, string> = {
  'taf_1555': '1555',
  'taf_4444': '4444',
};
