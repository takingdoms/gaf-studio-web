import { CONTROL_INPUT_HEIGHT, CONTROL_INPUT_WIDTH } from '@/lib/constants';
import React from 'react';

type NumberControlInputProps = {
  value: number | null;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
};

export default function NumberControlInput({
  value,
  setValue,
  min,
  max,
}: NumberControlInputProps) {
  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

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

  return (
    <input
      type="number"
      className="w-auto font-mono border border-gray-300 hide-spin-button px-0.5 py-0 mx-0.5"
      style={{ width: CONTROL_INPUT_WIDTH, height: CONTROL_INPUT_HEIGHT }}
      value={value ?? ''}
      onChange={onChange}
    />
  );
}
