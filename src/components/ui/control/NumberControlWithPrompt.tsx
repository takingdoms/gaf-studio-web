import NumberControlInput from '@/components/ui/control/NumberControlInput';
import { NumberControlSideButton } from '@/components/ui/control/NumberControlSideButton';
import { ModalHelpersContext } from '@/components/ui/modal/ModalContext';
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
  const { numberPrompt } = React.useContext(ModalHelpersContext);

  const onClickEdit = React.useCallback(async () => {
    if (setValue === undefined) {
      return;
    }

    const value = await numberPrompt({
      title: 'Number prompt',
      label: promptMessage ?? 'Enter a number:',
      min,
      max,
    });

    if (value === null) {
      return;
    }

    setValue(value);
  }, [setValue, promptMessage, min, max, numberPrompt]);

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
