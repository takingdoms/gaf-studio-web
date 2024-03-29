import FileMapViewerAreaGroup from '@/components/app/file-map-viewer/FileMapViewerAreaGroup';
import FileMapViewerInfo from '@/components/app/file-map-viewer/FileMapViewerInfo';
import { normalizeFileMap } from '@/lib/file-map/file-map';
import { useGlobalConfigStore } from '@/lib/state/global-config/global-config-store';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';
import { ReadonlyUint8Array } from '@/lib/utils/utility-types';
import LibGaf from 'lib-gaf';
import React from 'react';

export default function FileMapViewer() {
  const [labelFilter, setLabelFilter] = React.useState<string[]>();

  const currentGaf = S.useCurrentGaf();
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);

  if (currentGaf.kind === 'blank') {
    return null;
  }

  let originalGaf: LibGaf.Reader.GafReaderResult;
  let fileData: ReadonlyUint8Array;

  if (currentGaf.kind === 'from-file-single') {
    originalGaf = currentGaf.originalGaf;
    fileData = currentGaf.fileData;
  }
  else {
    if (activePairSubFormat === 'taf_1555') {
      originalGaf = currentGaf.data1555.originalGaf;
      fileData = currentGaf.data1555.fileData;
    }
    else {
      originalGaf = currentGaf.data4444.originalGaf;
      fileData = currentGaf.data4444.fileData;
    }
  }

  const normFileMap = normalizeFileMap(originalGaf.map);

  if (normFileMap === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-500~">
      <div className="mb-6 flex justify-center">
        <FileMapViewerInfo
          map={normFileMap}
          labelFilter={labelFilter}
          setLabelFilter={setLabelFilter}
        />
      </div>

      <div className="flex flex-col items-start">
        <div className="flex flex-col items-stretch space-y-4">
          {normFileMap.areaGroups.map((areaGroup, index) => {
            if (labelFilter !== undefined && !labelFilter.includes(areaGroup.label)) {
              return;
            }

            return (
              <FileMapViewerAreaGroup
                key={index}
                group={areaGroup}
                fileData={fileData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
