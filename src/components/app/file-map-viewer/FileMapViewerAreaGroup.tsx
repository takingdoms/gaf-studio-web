import React from 'react';
import FileMapViewerArea from '@/components/app/file-map-viewer/FileMapViewerArea';
import { FILE_MAP_VIEWER_COLORS } from '@/components/app/file-map-viewer/colors';
import { FileMapAreaGroup } from '@/lib/file-map/file-map';
import { CurrentGafFromFile } from '@/lib/state/gaf-studio/current-gaf';

type FileMapViewerAreaGroupProps = {
  group: FileMapAreaGroup;
  fileData: CurrentGafFromFile['fileData'];
};

export default function FileMapViewerAreaGroup({
  group,
  fileData,
}: FileMapViewerAreaGroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  const { label, areas } = group;

  const firstArea = areas[0];
  const lastArea = areas[areas.length - 1];
  const start = firstArea.offset;
  const end = lastArea.offset + lastArea.length;

  const colorCls = FILE_MAP_VIEWER_COLORS[label] ?? 'bg-black border-gray-700';

  return (
    <div className={`border ${colorCls} text-white px-4 py-2 font-mono`}>
      <div>
        {label}{' '}
        {label !== 'unknown-gap' && <span>x{areas.length}</span>}
      </div>
      <div>
        <span>{start}</span>&nbsp;
        <span>...</span>&nbsp;
        <span>{end}</span>&nbsp;
        <span>({end - start} bytes)</span>
      </div>
      <div className="flex flex-col items-start">
        <button
          className="hover:underline mb-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '[Collapse]' : '[Expand]'}
        </button>

        <div className="inline-flex flex-col space-y-2">
          {expanded && areas.map((area, index) => (
            <FileMapViewerArea
              key={index}
              area={area}
              fileData={fileData}
              index={index}
              isAlone={areas.length === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
