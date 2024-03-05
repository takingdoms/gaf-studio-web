export type Overwrite<TBase, TNew> = Omit<TBase, keyof TNew> & TNew;

export type ReadonlyUint8Array = Readonly<Uint8Array>; // TODO proper read-only typed arrays!

export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;
