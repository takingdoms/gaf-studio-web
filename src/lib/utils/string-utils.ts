export namespace StringUtils {
  export function fileNameWithoutExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');

    return lastDotIndex === -1
      ? fileName
      : fileName.substring(0, lastDotIndex);
  }

  export function commonPrefix(str1: string, str2: string): string {
    const minLength = Math.min(str1.length, str2.length);

    for (let i = 0; i < minLength; i++) {
      if (str1[i] !== str2[i]) {
        return str1.substring(0, i);
      }
    }

    return str1.substring(0, minLength);
  }
}
