import NumberControlInput from '@/components/ui/control/NumberControlInput';
import { NumberControlSideButton } from '@/components/ui/control/NumberControlSideButton';
import React from 'react';

type NumberControlProps = {
  value: number | null;
  setValue?: (value: number) => void; // if undefined, the NumberControls is "read-only"
  min?: number;
  max?: number;
};

export default function NumberControl({
  value,
  setValue,
  min,
  max,
}: NumberControlProps) {
  const onClickDecrease = React.useCallback(() => {
    if (value === null || setValue === undefined) {
      return;
    }

    const newValue = value - 1;

    if (min !== undefined && newValue < min) {
      return;
    }

    setValue(newValue);
  }, [min, value, setValue]);

  const onClickIncrease = React.useCallback(() => {
    if (value === null || setValue === undefined) {
      return;
    }

    const newValue = value + 1;

    if (max !== undefined && newValue > max) {
      return;
    }

    setValue(newValue);
  }, [max, value, setValue]);

  return (
    <div className="inline-flex items-center space-x-0.5">
      <NumberControlSideButton
        icon="-"
        onClick={setValue ? onClickDecrease : undefined}
      />
      <NumberControlInput
        value={value}
        setValue={setValue}
        min={min}
        max={max}
      />
      <NumberControlSideButton
        icon="+"
        onClick={setValue ? onClickIncrease : undefined}
      />
    </div>
  );
}
