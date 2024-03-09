export namespace ArrayUtils {
  export function update<T>(array: readonly T[], index: number, newValue: T): T[] {
    return array.map((value, i) => (i === index ? newValue : value));
  }

  export function updateFrom<T>(
    array: readonly T[],
    index: number,
    newValue: (oldValue: T) => T,
  ): T[] {
    return array.map((value, i) => (i === index ? newValue(value) : value));
  }
}
