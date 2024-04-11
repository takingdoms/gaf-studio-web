import LibGaf from "@takingdoms/lib-gaf";

export type NamedDepthConverter<TIn extends LibGaf.BitDepth, TOut extends LibGaf.BitDepth> = {
  id: string;
  name: string;
  desc: React.ReactNode; // can be a plain string
  converter: LibGaf.ColorUtils.DepthConverter<TIn, TOut>
};

export const NAMED_8_TO_1_CONVERTERS: readonly NamedDepthConverter<8, 1>[] = [
  {
    id: 'round',
    name: 'Round',
    desc: 'TODO',
    converter: (input) => input < 128 ? 0 : 1,
  },
  {
    id: 'opaque-or-0',
    name: 'Opaque or nothing',
    desc: 'TODO',
    converter: (input) => input === 255 ? 1 : 0,
  },
  {
    id: 'transparent-or-1',
    name: 'Transparent or full',
    desc: 'TODO',
    converter: (input) => input === 0 ? 0 : 1,
  },
];

export const NAMED_8_TO_5_CONVERTERS: readonly NamedDepthConverter<8, 5>[] = [
  {
    id: 'round',
    name: 'Round',
    desc: 'TODO',
    converter: LibGaf.ColorUtils.DepthConverters.round8to5,
  },
];

export const NAMED_8_TO_4_CONVERTERS: readonly NamedDepthConverter<8, 4>[] = [
  {
    id: 'round',
    name: 'Round',
    desc: 'TODO',
    converter: LibGaf.ColorUtils.DepthConverters.round8to4,
  },
];
