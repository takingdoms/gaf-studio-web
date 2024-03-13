export namespace Debug {
  export function assertEq<T>(v1: T, v2: T) {
    if (v1 !== v2) {
      throw new Error(`Expected ${v1} === ${v2}`);
    }
  }
}
