import { PaletteStoreContext } from '@/components/app/logical/PaletteStoreContext';
import PreludeAdvanced from '@/components/app/prelude/PreludeAdvanced';
import PreludeDownloadPwa from '@/components/app/prelude/PreludeDownloadPwa';
import PreludeLogo from '@/components/app/prelude/PreludeLogo';
import PreludeSeparator from '@/components/app/prelude/common-ui/PreludeSeparator';
import PreludeGafForm from '@/components/app/prelude/prelude-gaf/PreludeGafForm';
import PreludeTafForm from '@/components/app/prelude/prelude-taf/PreludeTafForm';
import Body from '@/components/ui/layout/Body';
import { WorkspaceConfigWrapper } from '@/lib/state/workspace/workspace-state';
import React from 'react';

type PreludeScreenProps = {
  onInit: (configWrapper: WorkspaceConfigWrapper) => void;
};

export default function PreludeScreen({ onInit }: PreludeScreenProps) {
  const [isLoadingGaf, setIsLoadingGaf] = React.useState(false);
  const [isLoadingTaf, setIsLoadingTaf] = React.useState(false);

  const paletteStore = React.useContext(PaletteStoreContext);

  if (paletteStore === null) {
    return 'No palette store provided.';
  }

  return (
    <Body>
      <div className="grow flex flex-col overflow-auto bg-gray-300 p-4">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            <PreludeLogo />
          </div>

          <div
            className="grid mb-10"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            <div
              className="m-10"
              style={{ minWidth: '20vw' }}
            >
              <PreludeGafForm
                isLoading={isLoadingGaf || isLoadingTaf}
                setIsLoading={setIsLoadingGaf}
                onInit={onInit}
                paletteStore={paletteStore}
              />
            </div>

            <PreludeSeparator />

            <div
              className="m-10"
              style={{ minWidth: '20vw' }}
            >
              <PreludeTafForm
                isLoading={isLoadingGaf || isLoadingTaf}
                setIsLoading={setIsLoadingTaf}
                onInit={onInit}
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <PreludeAdvanced
              isLoading={isLoadingGaf || isLoadingTaf}
              onInit={onInit}
              paletteStore={paletteStore}
            />

            <PreludeDownloadPwa />
          </div>
        </div>
      </div>
    </Body>
  );
}
