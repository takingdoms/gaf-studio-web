import SolidButton from "@/components/ui/button/SolidButton";
import SimpleInput from "@/components/ui/control/SimpleInput";
import { ModalNumberPromptResult } from "@/components/ui/modal/helpers/modalNumberPrompt";
import React from 'react';

type ModalNumberBodyProps = {
  label: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  min?: number;
  max?: number;
  isFloat?: boolean; // default = false
  defaultValue?: number;
  resolve: (result: ModalNumberPromptResult) => void;
};

export default function ModalNumberPromptBody({
  label,
  submitLabel,
  cancelLabel,
  min,
  max,
  isFloat,
  defaultValue,
  resolve,
}: ModalNumberBodyProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = React.useCallback(() => {
    setError(null);

    let value = inputRef.current?.value.trim();

    if (value === undefined || value === '') {
      return;
    }

    const numValue = isFloat ? parseFloat(value) : parseInt(value);

    if (Number.isNaN(numValue)) {
      setError(`Value is not a number`);
      return;
    }

    if (min !== undefined && numValue < min) {
      setError(`Value cannot be smaller than: ${min}`);
      return;
    }

    if (max !== undefined && numValue > max) {
      setError(`Value cannot be greater than: ${max}`);
      return;
    }

    resolve(numValue);
  }, [resolve, isFloat, min, max]);

  return (
    <div className="flex flex-col p-4">
      <div className="mb-2">
        {label}
      </div>

      <div className="flex space-x-2">
        <SimpleInput
          inputRef={inputRef}
          type="number"
          defaultValue={defaultValue}
        />
        <SolidButton
          color="success"
          onClick={onSubmit}
        >
          {submitLabel ?? 'Submit'}
        </SolidButton>
        <SolidButton
          color="default"
          onClick={() => resolve(null)}
        >
          {cancelLabel ?? 'Cancel'}
        </SolidButton>
      </div>

      <div className={`${error === null ? 'invisible' : ''}`}>
        <span className="text-red-600 text-xs">
          {error ?? '(No errors)'}
        </span>
      </div>
    </div>
  );
}
