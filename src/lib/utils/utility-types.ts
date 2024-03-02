export type Overwrite<TBase, TNew> = Omit<TBase, keyof TNew> & TNew;
