import NumberControlInput from '@/components/ui/control/NumberControlInput';
import { NumberControlSideButton } from '@/components/ui/control/NumberControlSideButton';
import { Icons } from '@/lib/react/icons';
import React from 'react';

type NumberControlWithPromptProps = {
  value: number | null;
  setValue?: (value: number) => void; // if undefined, the NumberControlWithPrompts is "read-only"
  promptMessage?: string;
  min?: number;
  max?: number;
};

export default function NumberControlWithPrompt({
  value,
  setValue,
  promptMessage,
  min,
  max,
}: NumberControlWithPromptProps) {
  const onClickEdit = React.useCallback(() => {
    if (setValue === undefined) {
      return;
    }

    const value = window.prompt(promptMessage ?? 'Enter a number:');

    if (value === null) {
      return;
    }

    const num = parseInt(value);

    if (Number.isNaN(num)) {
      window.alert(`Value entered is not an integer: ${num}`);
      return;
    }

    if (min !== undefined && num < min) {
      window.alert(`Value entered cannot be smaller than: ${min}`);
      return;
    }

    if (max !== undefined && num > max) {
      window.alert(`Value entered cannot be greater than: ${max}`);
      return;
    }

    setValue(num);
  }, [setValue, promptMessage, min, max]);

  return (
    <div className="inline-flex items-center space-x-0.5">
      <NumberControlInput
        value={value}
        setValue={setValue}
        min={min}
        max={max}
      />
      <NumberControlSideButton
        icon={<Icons.Edit size={14} />}
        onClick={setValue ? onClickEdit : undefined}
      />
    </div>
  );
}
