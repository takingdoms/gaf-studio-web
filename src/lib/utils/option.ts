export type Option<T> = {
  kind: 'some';
  some: T;
} | {
  kind: 'none';
};
