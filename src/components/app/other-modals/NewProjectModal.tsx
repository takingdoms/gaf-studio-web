import { AppDebugContext } from '@/components/AppDebugContext';
import SolidButton from '@/components/ui/button/SolidButton';
import ModalPadding from '@/components/ui/modal/ModalPadding';
import React from 'react';

type NewProjectModalProps = {
  close: () => void;
};

export default function NewProjectModal({ close }: NewProjectModalProps) {
  const [disabled, setDisabled] = React.useState(true);

  const appDebug = React.useContext(AppDebugContext);

  React.useEffect(() => {
    setTimeout(() => setDisabled(false), 450);
  }, []);

  return (
    <ModalPadding>
      <div className="mb-8">
        <div className="mb-1">Are you sure want to create a new project?</div>
        <div className="font-semibold">
          All unsaved progress will be permanently <span className="text-red-500">LOST</span>.
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <SolidButton
          color="danger"
          disabled={disabled}
          onClick={appDebug.resetWorkspace}
        >
          New project
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
