export type Result<R, E> = ResultOk<R> | ResultErr<E>;

export type ResultOk<R> = {
  kind: 'ok';
  result: R;
}

export type ResultErr<E> = {
  kind: 'err';
  error: E;
};
