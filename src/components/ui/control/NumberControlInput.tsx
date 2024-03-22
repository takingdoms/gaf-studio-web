import { CONTROL_INPUT_HEIGHT, CONTROL_INPUT_WIDTH } from '@/lib/constants';
import React from 'react';

type NumberControlInputProps = {
  value: number | null;
  setValue?: (value: number) => void; // if undefined, the NumberControls is "read-only"
  min?: number;
  max?: number;
};

export default function NumberControlInput({
  value,
  setValue,
  min,
  max,
}: NumberControlInputProps) {
  const [innerValue, setInnerValue] = React.useState<string>(value?.toString() ?? '');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const lastNumRef = React.useRef<number>();

  React.useEffect(() => {
    const input = inputRef.current;

    if (input === null) {
      return;
    }

    const onBlur = () => {
      if (input.value === '') {
        input.value = lastNumRef.current?.toString() ?? '';
      }
    };

    input.addEventListener('blur', onBlur);

    return () => input.removeEventListener('blur', onBlur);
  }, []);

  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const value = ev.target.value;
    setInnerValue(value);

    if (setValue === undefined) {
      return;
    }

    let numValue = parseInt(value);

    if (Number.isNaN(numValue)) {
      return;
    }

    if (min !== undefined) {
      numValue = Math.max(numValue, min);
    }

    if (max !== undefined) {
      numValue = Math.min(numValue, max);
    }

    lastNumRef.current = numValue;
    setValue(numValue);
    setInnerValue(numValue.toString());
  }, [min, max, setValue]);

  const borderCls = setValue ? 'border-gray-300' : 'border-transparent';

  return (
    <input
      ref={inputRef}
      type="number"
      className={`hide-spin-button w-auto font-mono border ${borderCls} px-0.5 py-0`}
      style={{ width: CONTROL_INPUT_WIDTH, height: CONTROL_INPUT_HEIGHT }}
      value={innerValue}
      onChange={onChange}
    />
  );
}
