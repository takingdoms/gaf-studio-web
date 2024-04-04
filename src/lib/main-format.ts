import { ReadonlyRecord } from '@/lib/utils/utility-types';
import { ElementOf } from 'ts-essentials';

export const MAIN_FORMATS = [
  'gaf',
  'taf-solo',
  'taf-pair',
] as const satisfies string[];

export type MainFormat = ElementOf<typeof MAIN_FORMATS>;

export const TAF_SUB_FORMATS = [
  'taf_1555',
  'taf_4444',
] as const satisfies string[];

export type TafSubFormat = ElementOf<typeof TAF_SUB_FORMATS>;

export const TAF_SUB_FORMAT_TO_LABEL: ReadonlyRecord<TafSubFormat, string> = {
  'taf_1555': '1555',
  'taf_4444': '4444',
};

export type TafSubFormatToColorDataFormat<T> = T extends 'taf_1555' ? 'argb1555' : 'argb4444';
