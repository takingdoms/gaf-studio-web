export type Result<R, E> = ResultOk<R> | ResultErr<E>;

export type ResultOk<R> = {
  kind: 'ok';
  ok: R;
}

export type ResultErr<E> = {
  kind: 'err';
  err: E;
};
