export type Overwrite<TBase, TNew> = Omit<TBase, keyof TNew> & TNew;

export type ReadonlyUint8Array = Readonly<Uint8Array>; // TODO proper read-only typed arrays!

export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;

export type ColorRgb = { r: number; g: number; b: number };
export type ColorRgba = ColorRgb & { a: number };
