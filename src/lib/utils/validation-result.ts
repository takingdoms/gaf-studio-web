export type ValidationResult = {
  kind: 'valid';
} | {
  kind: 'invalid';
  reason: string;
};
