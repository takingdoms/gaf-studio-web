import NumberControlInput from '@/components/ui/control/NumberControlInput';
import { NumberControlSideButton } from '@/components/ui/control/NumberControlSideButton';
import { IconFunc, Icons } from '@/lib/react/icons';
import React, { ChangeEvent } from 'react';

type NumberControlProps = {
  value: number | null;
  setValue: (value: number) => void;
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
    if (value === null) {
      return;
    }

    const newValue = value - 1;

    if (min !== undefined && newValue < min) {
      return;
    }

    setValue(newValue);
  }, [min, value, setValue]);

  const onClickIncrease = React.useCallback(() => {
    if (value === null) {
      return;
    }

    const newValue = value + 1;

    if (max !== undefined && newValue > max) {
      return;
    }

    setValue(newValue);
  }, [max, value, setValue]);

  return (
    <div className="inline-flex items-center">
      <NumberControlSideButton
        icon="-"
        onClick={onClickDecrease}
      />
      <NumberControlInput
        value={value}
        setValue={setValue}
        min={min}
        max={max}
      />
      <NumberControlSideButton
        icon="+"
        onClick={onClickIncrease}
      />
    </div>
  );
}
