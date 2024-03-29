import PreludeTafSoloFormModal from '@/components/app/prelude/prelude-taf/PreludeTafSoloFormModal';
import TextButton from '@/components/ui/button/TextButton';
import { ModalContext } from '@/components/ui/modal/ModalContext';
import { PaletteStore } from '@/lib/state/gaf-studio/palette-store';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import { WorkspaceStateInitializer } from '@/lib/workspace-state-initializer/workspace-state-initializer';
import React from 'react';

type PreludeAdvancedProps = {
  isLoading: boolean;
  onInit: (configWrapper: WorkspaceConfigWrapper) => void;
  paletteStore: PaletteStore;
};

export default function PreludeAdvanced({
  isLoading,
  onInit,
  paletteStore,
}: PreludeAdvancedProps) {
  const [visible, setVisible] = React.useState(false);

  const modal = React.useContext(ModalContext);

  const onClickLoadBlankGaf = React.useCallback(() => {
    const result = WorkspaceStateInitializer.initBlankGaf(paletteStore.default);
    onInit(result.configWrapper);
  }, [onInit, paletteStore]);

  const onClickLoadBlankTafPair = React.useCallback(() => {
    const result = WorkspaceStateInitializer.initBlankTafPair();
    onInit(result.configWrapper);
  }, [onInit]);

  const onClickLoadTafSolo = React.useCallback(() => {
    if (isLoading) {
      return;
    }

    const { close } = modal.pushModal({
      title: 'Loading individual TAF',
      body: (
        <PreludeTafSoloFormModal
          isLoading={isLoading}
          onInit={onInit}
          close={() => close()}
        />
      ),
    });
  }, [modal, isLoading, onInit]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs">
        <TextButton
          label={visible ? 'Hide advanced' : 'Show advanced'}
          onClick={() => setVisible(!visible)}
        />
      </div>

      {visible && (
        <div className="mt-0.5 border border-gray-400 rounded-sm text-xs">
          <div className="bg-gray-400 text-center px-2 py-1 border-b border-gray-400">
            <span className="text-white font-semibold">Advanced Options</span>
          </div>

          <div className="flex flex-col items-start space-y-2 px-2 py-2">
            <TextButton
              label="Create empty GAF"
              onClick={onClickLoadBlankGaf}
            />

            <TextButton
              label="Create empty TAFs"
              onClick={onClickLoadBlankTafPair}
            />

            <TextButton
              label="Load invidual TAF"
              onClick={onClickLoadTafSolo}
            />
          </div>
        </div>
      )}
    </div>
  );
}
