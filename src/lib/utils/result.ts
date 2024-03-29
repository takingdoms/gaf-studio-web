export type Result<R, E> = {
  kind: 'ok';
  result: R;
} | {
  kind: 'err';
  error: E;
};
