export namespace AsyncUtils {
  export function defer<T>(runnable: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        runnable()
          .then(resolve)
          .catch(reject);
      }, 200);
    });
  }

  export function deferMap<T1, T2>(items: T1[], mapper: (item: T1) => Promise<T2>): Promise<T2[]> {
    return defer(
      () => Promise.all(
        items.map(mapper)
      )
    );
  }
}
