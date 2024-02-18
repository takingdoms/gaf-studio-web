import { FILE_MAP_VIEWER_COLORS } from '@/components/app/file-map-viewer/colors';
import { FileMapLabel, NormalizedFileMap } from '@/lib/file-map/file-map';
import React from 'react';

type FileMapViewerInfoProps = {
  map: NormalizedFileMap;
  labelFilter: string[] | undefined;
  setLabelFilter: (filter: string[] | undefined) => void;
};

type Counter = Partial<Record<FileMapLabel, number>>;

export default function FileMapViewerInfo({
  map,
  labelFilter,
  setLabelFilter,
}: FileMapViewerInfoProps) {
  const counter: Counter = React.useMemo(() => {
    const result: Counter = {};

    for (const group of map.areaGroups) {
      const existing = result[group.label];

      if (existing === undefined) {
        result[group.label] = group.areas.length;
      }
      else {
        result[group.label] = existing + group.areas.length;
      }
    }

    return result;
  }, [map]);

  return (
    <div
      className="flex flex-wrap justify-center"
      style={{ maxWidth: '50%' }}
    >
      {Object.entries(counter).map(([key, value]) => {
        const colorCls = FILE_MAP_VIEWER_COLORS[key as FileMapLabel] ?? 'bg-black border-gray-700';
        const filterCls = labelFilter === undefined || labelFilter.includes(key)
          ? ''
          : 'opacity-50';

        return (
          <button
            key={key}
            className={`border ${colorCls} ${filterCls} text-white text-sm px-1 py-0.5 mx-1 mb-2`}
            onClick={(ev) => {
              ev.preventDefault();

              if (labelFilter === undefined) {
                setLabelFilter([key]);
                return;
              }

              if (labelFilter.includes(key)) {
                setLabelFilter(labelFilter.filter((f) => f !== key));
              } else {
                setLabelFilter([...labelFilter, key]);
              }
            }}
          >
            <span>{key}:</span>{' '}
            <span className="font-mono">x{value}</span>
          </button>
        );
      })}
    </div>
  );
}
