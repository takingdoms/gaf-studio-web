export namespace ObjectUtils {
  export function remove<T extends object, K extends keyof T>(obj: T, propertyKey: K): Omit<T, K> {
    if (propertyKey in obj) {
      delete obj[propertyKey];
    }

    return obj as Omit<T, K>;
  }

  export function select<T extends object, K extends keyof T>(obj: T, propertyKeys: K[]):
    Pick<T, K>
  {
    const result: Partial<T> = {};

    for (const key of propertyKeys) {
      if (key in obj) {
        result[key] = obj[key];
      }
    }

    return result as Pick<T, K>;
  }
}
