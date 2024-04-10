import { ElementOf } from "ts-essentials";

export namespace BinaryValidation {
  export const INT_TYPES = [
    'u8', 'i8', 'u16', 'i16', 'u32', 'i32',
  ] as const;

  export type IntType = ElementOf<typeof INT_TYPES>;

  export const INT_TYPE_TO_SIZE: Record<IntType, 8 | 16 | 32> = {
    'u8': 8,
    'i8': 8,
    'u16': 16,
    'i16': 16,
    'u32': 32,
    'i32': 32,
  };

  export const INT_TYPE_TO_SIGNEDNESS: Record<IntType, boolean> = {
    'u8': false,
    'i8': true,
    'u16': false,
    'i16': true,
    'u32': false,
    'i32': true,
  };

  export function validateInt(int: number, type: IntType): boolean {
    let min: number;
    let max: number;

    switch (type) {
      case 'u8':
          min = 0;
          max = 255;
          break;
      case 'i8':
          min = -128;
          max = 127;
          break;
      case 'u16':
          min = 0;
          max = 65535;
          break;
      case 'i16':
          min = -32768;
          max = 32767;
          break;
      case 'u32':
          min = 0;
          max = 4294967295;
          break;
      case 'i32':
          min = -2147483648;
          max = 2147483647;
          break;
      default:
          throw new Error('Invalid integer type.');
  }

  return int >= min && int <= max;
  }

  // written by ChatGPT
  /*export function validateInt(int: number, bits: 8 | 16 | 32, signed: boolean): boolean {
    let minValue: number;
    let maxValue: number;

    switch (bits) {
      case 8:
        if (signed) {
          minValue = -128;
          maxValue = 127;
        } else {
          minValue = 0;
          maxValue = 255;
        }
        break;
      case 16:
        if (signed) {
          minValue = -32768;
          maxValue = 32767;
        } else {
          minValue = 0;
          maxValue = 65535;
        }
        break;
      case 32:
        if (signed) {
          minValue = -2147483648;
          maxValue = 2147483647;
        } else {
          minValue = 0;
          maxValue = 4294967295;
        }
        break;
      default:
        throw new Error('Invalid number of bits. Supported values are "8", "16", "32", or "64".');
    }

    return int >= minValue && int <= maxValue;
  }*/
}
