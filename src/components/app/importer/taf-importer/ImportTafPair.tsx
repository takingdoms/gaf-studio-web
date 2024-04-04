import { FinalImportResult } from '@/components/app/importer/common/common-importing-types';
import ImportTafWizard from '@/components/app/importer/taf-importer/ImportTafWizard';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import React from 'react';

type ImportTafPairProps = {
  type: 'frames' | 'subframes';
  onEnded: () => void;
  onAbort: () => void;
};

export default function ImportTafPair({
  type,
  onAbort,
  onEnded,
}: ImportTafPairProps) {
  const addFramesToActiveEntry = S.useAddFramesToActiveEntry();
  const addSubframesToActiveFrame = S.useAddSubframesToActiveFrame();
  const convertActiveFrameToMultiFrame = S.useConvertActiveFrameToMultiFrame();

  const onFinish = React.useCallback((result: FinalImportResult) => {
    if (result.type === 'frames') {
      addFramesToActiveEntry(result.frames);
    }
    else {
      const didConvert = convertActiveFrameToMultiFrame(true);
      addSubframesToActiveFrame(result.subframes);

      if (didConvert) {
        // TODO put this in a nice toaster
        alert(`The current Frame was automatically converted to a multi-layered Frame.`);
      }
    }

    onEnded();
  }, [onEnded, addFramesToActiveEntry, addSubframesToActiveFrame, convertActiveFrameToMultiFrame]);

  return (
    <ImportTafWizard
      target={{ kind: 'taf-pair' }}
      type={type}
      onFinish={onFinish}
      onAbort={onAbort}
    />
  );
}
