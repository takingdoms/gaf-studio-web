import { ValidationResult } from "@/lib/utils/validation-result";

export namespace GafValidation {
  export const ENTRY_NAME_MAX_LENGTH = 31;

  export const ENTRY_NAME_REGEX = /^[a-zA-Z0-9_]+$/;

  export function validateEntryName(name: string): ValidationResult {
    if (name.length === 0) {
      return { kind: 'invalid', reason: `Value is empty.` };
    }

    if (name.length > ENTRY_NAME_MAX_LENGTH) {
      return { kind: 'invalid', reason: `Value exceeds character limit.` };
    }

    if (!ENTRY_NAME_REGEX.test(name)) {
      return { kind: 'invalid', reason: `Value contains invalid character.` };
    }

    /*for (let i = 0; i < name.length; i++) {
      const charCode = name.charCodeAt(i);
      if (charCode < 0x00 || charCode > 0x7F) {
        return { kind: 'invalid', reason: `Value contains non-ASCII character.` };
      }
    }*/

    return { kind: 'valid' };
  }
}
