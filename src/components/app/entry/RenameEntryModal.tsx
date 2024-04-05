import EntryNameForm from '@/components/app/entry/EntryNameForm';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import React from 'react';

type RenameEntryModalProps = {
  close: () => void;
};

export default function RenameEntryModal({ close }: RenameEntryModalProps) {
  const activeEntry = S.useActiveEntry();
  const renameActiveEntry = S.useRenameActiveEntry();
  const existingEntryNames = S.useEntries().map((entry) => entry.name);

  const onSubmit = React.useCallback((name: string) => {
    renameActiveEntry(name);
    close();
  }, [renameActiveEntry, close]);

  if (activeEntry === null) {
    return (
      <ModalPadding>
        No active sequence.
      </ModalPadding>
    );
  }

  return (
    <ModalPadding>
      <EntryNameForm
        defaultValue={activeEntry.name}
        existingEntryNames={existingEntryNames}
        onSubmit={onSubmit}
        close={close}
      />
    </ModalPadding>
  );
}
