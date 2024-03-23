import { FinalImportResult } from '@/components/app/importer/common/common-importing-types';
import ImportGafWizard from '@/components/app/importer/gaf-importer/ImportGafWizard';
import { GafWorkspaceStore } from '@/lib/react/workspace-store-context';
import { VirtualFrame, VirtualFrameData, VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ImportGafProps = {
  type: 'frames' | 'subframes';
  useGafStore: GafWorkspaceStore;
  onEnded: () => void;
  onAbort: () => void;
};

export default function ImportGaf({
  type,
  useGafStore,
  onAbort,
  onEnded,
}: ImportGafProps) {
  const currentPalette = useGafStore((state) => state.currentPalette);
  const setCurrentPalette = useGafStore((state) => state.setCurrentPalette);

  const addFramesToActiveEntry = useGafStore((state) => state.addFramesToActiveEntry);
  const addSubframesToActiveFrame = useGafStore((state) => state.addSubframesToActiveFrame);
  const convertActiveFrameToMultiFrame = useGafStore((state) => state.convertActiveFrameToMultiFrame);

  const onFinish = React.useCallback((result: FinalImportResult) => {
    if (result.type === 'frames') {
      addFramesToActiveEntry(result.frames as VirtualFrame<'gaf'>[]);
    }
    else {
      const didConvert = convertActiveFrameToMultiFrame(true);
      addSubframesToActiveFrame(result.subframes as VirtualFrameDataSingleLayer<'gaf'>[]);

      if (didConvert) {
        // TODO put this in a nice toaster
        alert(`The current Frame was automatically converted to a multi-layered Frame.`);
      }
    }

    onEnded();
  }, [onEnded, addFramesToActiveEntry, addSubframesToActiveFrame, convertActiveFrameToMultiFrame]);

  return (
    <ImportGafWizard
      type={type}
      currentPalette={currentPalette}
      setCurrentPalette={setCurrentPalette}
      onFinish={onFinish}
      onAbort={onAbort}
    />
  );
}
