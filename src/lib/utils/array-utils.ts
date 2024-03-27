export namespace ArrayUtils {
  export function update<T>(array: readonly T[], index: number, newValue: T): T[] {
    if (index < 0 || index > array.length) {
      console.error(index);
      console.error(array);
      throw new Error(`Index out of bounds.`);
    }

    const newArray = [...array];
    newArray[index] = newValue;
    return newArray;
  }

  export function updateFrom<T>(
    array: readonly T[],
    index: number,
    newValue: (oldValue: T) => T,
  ): T[] {
    if (index < 0 || index > array.length) {
      console.error(index);
      console.error(array);
      throw new Error(`Index out of bounds.`);
    }

    const newArray = [...array];
    newArray[index] = newValue(newArray[index]);
    return newArray;
  }
}
