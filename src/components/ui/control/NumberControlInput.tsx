import { CONTROL_INPUT_HEIGHT, CONTROL_INPUT_WIDTH } from '@/lib/constants';
import React from 'react';

type NumberControlInputProps = {
  value: number | null;
  setValue?: (value: number) => void; // if undefined, the NumberControls is "read-only"
  min?: number;
  max?: number;
  allowUnsafeIntegers?: boolean;
};

export default function NumberControlInput({
  value,
  setValue,
  min,
  max,
  allowUnsafeIntegers,
}: NumberControlInputProps) {
  if (!allowUnsafeIntegers) {
    min ??= Number.MIN_SAFE_INTEGER;
    max ??= Number.MAX_SAFE_INTEGER;
  }

  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    if (setValue === undefined) {
      return;
    }

    let newValue = parseInt(ev.target.value);

    if (Number.isNaN(newValue)) {
      return;
    }

    if (min !== undefined) {
      newValue = Math.max(newValue, min);
    }

    if (max !== undefined) {
      newValue = Math.min(newValue, max);
    }

    setValue(newValue);
  }, [min, max, setValue]);

  const borderCls = setValue ? 'border-gray-300' : 'border-transparent';

  return (
    <input
      type="number"
      className={`hide-spin-button w-auto font-mono border ${borderCls} px-0.5 py-0`}
      style={{ width: CONTROL_INPUT_WIDTH, height: CONTROL_INPUT_HEIGHT }}
      value={value ?? ''}
      onChange={onChange}
    />
  );
}
