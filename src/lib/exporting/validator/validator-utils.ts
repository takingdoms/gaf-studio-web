import { ValidatorError, NodePath } from "@/lib/exporting/validator/build-validator";
import { BinaryValidation } from "@/lib/validation/binary-validation";

export namespace ValidatorUtils {
  export function printInt(int: number, size: 8 | 16 | 32): string {
    const hexString = int.toString(16).padStart(size / 4, '0').toUpperCase();
    return `${int} (0x${hexString})`;
  }

  export function validateIntValueAndSize(
    fieldName: string,
    int: number,
    expected: number,
    type: BinaryValidation.IntType,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ) {
    if (int !== expected) {
      const size = BinaryValidation.INT_TYPE_TO_SIZE[type];
      const signedness = BinaryValidation.INT_TYPE_TO_SIGNEDNESS[type] ? 'signed' : 'unsigned';

      mutErrors.push({
        path,
        message: `${fieldName} should normally be: ${printInt(expected, size)}`,
        severity: 'med',
      });

      if (!BinaryValidation.validateInt(int, type)) {
        mutErrors.push({
          path,
          message: `${fieldName} field won't fit into a ${signedness} ${size}-bit integer.`,
          severity: 'high',
        });
      }
    }
  }

  export function validateIntSize(
    fieldName: string,
    int: number,
    type: BinaryValidation.IntType,
    path: readonly NodePath[],
    mutErrors: ValidatorError[],
  ) {
    const size = BinaryValidation.INT_TYPE_TO_SIZE[type];
    const signedness = BinaryValidation.INT_TYPE_TO_SIGNEDNESS[type] ? 'signed' : 'unsigned';

    if (!BinaryValidation.validateInt(int, type)) {
      mutErrors.push({
        path,
        message: `${fieldName} field won't fit into a ${signedness} ${size}-bit integer.`,
        severity: 'high',
      });
    }
  }
}
