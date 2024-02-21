import FileMapViewerAreaGroup from '@/components/app/file-map-viewer/FileMapViewerAreaGroup';
import FileMapViewerInfo from '@/components/app/file-map-viewer/FileMapViewerInfo';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import { normalizeFileMap } from '@/lib/file-map/file-map';
import React from 'react';

export default function FileMapViewer() {
  const [labelFilter, setLabelFilter] = React.useState<string[]>();

  const workspace = React.useContext(WorkspaceContext);
  const currentGaf = workspace?.getCurrentGaf() ?? undefined;

  const normFileMap = React.useMemo(() => {
    if (currentGaf === undefined || currentGaf.kind !== 'from-file') {
      return null;
    }

    return normalizeFileMap(currentGaf.gafResult.map);
  }, [currentGaf]);

  if (currentGaf === undefined || currentGaf.kind !== 'from-file' || normFileMap === null) {
    return null;
  }

  return (
    <div className="min-h-full flex flex-col items-center p-4 bg-gray-500">
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
                fileData={currentGaf.fileData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
