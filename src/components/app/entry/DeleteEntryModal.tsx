import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import React from 'react';

type DeleteEntryModalProps = {
  close: () => void;
};

export default function DeleteEntryModal({ close }: DeleteEntryModalProps) {
  const [disabled, setDisabled] = React.useState(true);

  const activeEntry = S.useActiveEntry();
  const deleteActiveEntry = S.useDeleteActiveEntry();

  React.useEffect(() => {
    setTimeout(() => setDisabled(false), 450);
  }, []);

  const onSubmit = React.useCallback(() => {
    deleteActiveEntry();
    close();
  }, [deleteActiveEntry, close]);

  if (activeEntry === null) {
    return (
      <ModalPadding>
        No active sequence.
      </ModalPadding>
    );
  }

  return (
    <ModalPadding>
      <div className="mb-2">
        Are you sure you want to <span className="font-bold text-red-500">delete</span>{' '}
        this Sequence and all of its <b>{activeEntry.frames.length}</b> Frames?
      </div>

      <div className="flex justify-end space-x-2 mb-2">
        <SolidButton
          color="danger"
          onClick={onSubmit}
          disabled={disabled}
        >
          Delete
        </SolidButton>
        <SolidButton
          color="default"
          onClick={close}
        >
          Cancel
        </SolidButton>
      </div>
    </ModalPadding>
  );
}
