export type Overwrite<TBase, TNew> = Omit<TBase, keyof TNew> & TNew;

export type ReadonlyUint8Array = Readonly<Uint8Array>; // TODO proper read-only typed arrays!

export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;

export type ColorRgb = {
  readonly r: number;
  readonly g: number;
  readonly b: number;
};

export type ColorRgba = ColorRgb & {
  readonly a: number;
};

export type Replace<T extends object, K extends keyof T, P> = Omit<T, K> & {[key in K]: P};
