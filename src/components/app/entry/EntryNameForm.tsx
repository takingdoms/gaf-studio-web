import SolidButton from '@/components/ui/button/SolidButton';
import SimpleInput from '@/components/ui/control/SimpleInput';
import { GafValidation } from '@/lib/validation/gaf-validation';
import React from 'react';

type EntryNameFormProps = {
  defaultValue?: string;
  onSubmit: (validName: string) => void;
};

export default function EntryNameForm({ defaultValue, onSubmit }: EntryNameFormProps) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSubmitForm = React.useCallback(() => {
    const input = inputRef.current;

    if (input === null) {
      return;
    }


    const value = input.value.trim();

    if (value === defaultValue) {
      close();
      return;
    }

    const validationResult = GafValidation.validateEntryName(value);

    if (validationResult.kind === 'invalid') {
      setErrorMsg(validationResult.reason);
      return;
    }

    setErrorMsg(null);
    onSubmit(value);
  }, [onSubmit, defaultValue]);

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
