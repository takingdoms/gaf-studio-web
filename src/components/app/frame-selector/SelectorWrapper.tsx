import ImportModal from "@/components/app/importer/ImportModal";
import TextButton from "@/components/ui/button/TextButton";
import { ModalContext } from "@/components/ui/modal/ModalContext";
import { FRAME_SELECTOR_ITEM_HEIGHT } from "@/lib/constants";
import React from "react";

type SelectorWrapperProps = {
  type: 'frames' | 'subframes';
  children: React.ReactNode;
};

export default function SelectorWrapper({ type, children }: SelectorWrapperProps) {
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
      <div className="flex items-center text-sm space-x-1.5  mb-0.5">
        <div className="font-bold text-gray-700">
          {type === 'frames' ? 'Frame' : 'Subframe'}:
        </div>

        <TextButton
          label="Import"
          onClick={onClickImport}
        />
      </div>

      <div
        className="grow flex overflow-x-scroll space-x-1.5 pb-1"
        style={{ minHeight: FRAME_SELECTOR_ITEM_HEIGHT }}
      >
        {children}
      </div>
    </div>
  );
}
