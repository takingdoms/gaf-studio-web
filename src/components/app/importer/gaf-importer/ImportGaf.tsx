import { FinalImportResult } from '@/components/app/importer/common/common-importing-types';
import ImportGafWizard from '@/components/app/importer/gaf-importer/ImportGafWizard';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { GafS } from '@/lib/state/workspace/workspace-context/gaf-workspace-helper';
import { VirtualFrame, VirtualFrameDataSingleLayer } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type ImportGafProps = {
  type: 'frames' | 'subframes';
  onEnded: () => void;
  onAbort: () => void;
};

export default function ImportGaf({
  type,
  onAbort,
  onEnded,
}: ImportGafProps) {
  const currentPalette = GafS.useCurrentPalette();
  const setCurrentPalette = GafS.useSetCurrentPalette();

  const addFramesToActiveEntry = S.useAddFramesToActiveEntry();
  const addSubframesToActiveFrame = S.useAddSubframesToActiveFrame();
  const convertActiveFrameToMultiFrame = S.useConvertActiveFrameToMultiFrame();

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
