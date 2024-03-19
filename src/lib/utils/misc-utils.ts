export namespace MiscUtils {
  export function notNull<T>(value: T | null): value is T {
    return value !== null;
  }

  export function notUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
  }

  export function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}
