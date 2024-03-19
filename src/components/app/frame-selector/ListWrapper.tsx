import ListModeControls from "@/components/app/frame-selector/ListModeControls";
import ImportModal from "@/components/app/importer/ImportModal";
import { ModalContext } from "@/components/ui/modal/ModalContext";
import React from "react";

type ListWrapperProps = {
  type: 'frames' | 'subframes';
  children: React.ReactNode;
};

export default function ListWrapper({ type, children }: ListWrapperProps) {
  const modal = React.useContext(ModalContext);

  const onClickImport = React.useCallback(() => {
    const { close } = modal.pushModal({
      title: 'Import Images Wizard',
      disableBackgroundClose: true,
      body: (
        <ImportModal
          type={type}
          close={() => close()}
        />
      ),
    });
  }, [type, modal]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between~ items-center text-sm space-x-1.5 mb-0.5">
        <div className="font-bold text-gray-700">
          {type === 'frames' ? 'Frames' : 'Subframes'}:
        </div>

        <ListModeControls type={type} />
      </div>

      {children}
    </div>
  );
}
