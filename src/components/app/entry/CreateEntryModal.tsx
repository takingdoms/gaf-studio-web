import EntryNameForm from '@/components/app/entry/EntryNameForm';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import React from 'react';

type CreateEntryModalProps = {
  close: () => void;
};

export default function CreateEntryModal({ close }: CreateEntryModalProps) {
  const createEntry = S.useCreateEntry();

  const onSubmit = React.useCallback((name: string) => {
    createEntry(name);
    close();
  }, [createEntry, close]);

  return (
    <ModalPadding>
      <EntryNameForm onSubmit={onSubmit} />
    </ModalPadding>
  );
}
