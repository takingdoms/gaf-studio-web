import SolidButton from '@/components/ui/button/SolidButton';
import SimpleInput from '@/components/ui/control/SimpleInput';
import { GafValidation } from '@/lib/validation/gaf-validation';
import React from 'react';

type EntryNameFormProps = {
  defaultValue?: string;
  existingEntryNames: string[]; // should be in the same order as the actual entries lsit
  onSubmit: (validName: string) => void;
  close: () => void;
};

export default function EntryNameForm({
  defaultValue,
  existingEntryNames,
  onSubmit,
  close,
}: EntryNameFormProps) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmitForm = React.useCallback(() => {
    const input = inputRef.current;

    if (input === null) {
      return;
    }

    const value = input.value.trim();

    if (value === defaultValue) {
      return;
    }

    const existingIdx = existingEntryNames.indexOf(value);

    if (existingIdx !== -1) {
      setErrorMsg(`A sequence with this name already exists. (Sequence #${existingIdx + 1})`);
      return;
    }

    const validationResult = GafValidation.validateEntryName(value);

    if (validationResult.kind === 'invalid') {
      setErrorMsg(validationResult.reason);
      return;
    }

    setErrorMsg(null);
    onSubmit(value);
  }, [onSubmit, defaultValue, existingEntryNames]);

  return (
    <div>
      <div className="mb-2">
        Sequence name:
      </div>

      <div className="flex space-x-2 mb-2">
        <SimpleInput
          type="text"
          inputRef={inputRef}
          defaultValue={defaultValue}
        />
        <SolidButton
          color="success"
          onClick={onSubmitForm}
        >
          Submit
        </SolidButton>
        <SolidButton
          color="default"
          onClick={close}
        >
          Cancel
        </SolidButton>
      </div>

      <div className="text-xs text-slate-600 bg-slate-200 font-semibold px-2 py-1 rounded">
        <div>Name can only contain ASCII letters, numbers or underscores.</div>
        <div>Name may not exceed 31 characters.</div>
      </div>

      <div className={`${errorMsg === null ? 'invisible' : ''}`}>
        <span className="text-red-600 text-xs">
          {errorMsg ?? '(No errors)'}
        </span>
      </div>
    </div>
  );
}
