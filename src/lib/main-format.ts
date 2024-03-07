import { ReadonlyRecord } from '@/lib/utils/utility-types';
import LibGaf from 'lib-gaf';
import { ElementOf } from 'ts-essentials';

export const MAIN_FORMATS: LibGaf.GafFormat[] = [
  'gaf',
  'taf',
];

export type MainFormat = LibGaf.GafFormat;

export const TAF_SUB_FORMATS = [
  'taf_1555',
  'taf_4444',
] as const satisfies string[];

export type TafSubFormat = ElementOf<typeof TAF_SUB_FORMATS>;

export const TAF_SUB_FORMAT_TO_LABEL: ReadonlyRecord<TafSubFormat, string> = {
  'taf_1555': '1555',
  'taf_4444': '4444',
};
