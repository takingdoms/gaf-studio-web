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

  const onFinish = React.useCallback((result: FinalImportResult) => {
    if (result.type === 'frames') {
      addFramesToActiveEntry(result.frames as VirtualFrame<'gaf'>[]);
    }
    else {
      addSubframesToActiveFrame(result.subframes as VirtualFrameDataSingleLayer<'gaf'>[]);
    }

    onEnded();
  }, [onEnded, addFramesToActiveEntry, addSubframesToActiveFrame]);

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
