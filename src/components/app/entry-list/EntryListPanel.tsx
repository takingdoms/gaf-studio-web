import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import Panel from '@/components/ui/panel/Panel';
import React from 'react';

const thCls = 'px-2 py-1 text-left border~ border-gray-300';
const tdCls = 'px-2 py-1';

export default function EntryListPanel() {
  const workspace = React.useContext(WorkspaceContext);
  const currentGaf = workspace?.getCurrentGaf();

  const entryItems = React.useMemo(() => {
    if (currentGaf === undefined || currentGaf === null) {
      return null;
    }

    return currentGaf.kind === 'blank'
      ? currentGaf.entries
      : currentGaf.gafResult.gaf.entries;
  }, [currentGaf]);

  const table = React.useMemo(() => {
    if (entryItems === null) {
      return (
        <div className="text-gray-500">(Nothing loaded)</div>
      );
    }

    return (
      <table className="text-xs">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className={thCls}>Name</th>
            {/* <th className={thCls}>Animate</th> */}
            <th className={thCls}>Frames</th>
            <th className={thCls}>Subframes</th>
          </tr>
        </thead>
        <tbody>
          {entryItems.map((entry, index) => {
            const subFrames = entry.frames.reduce((total, next) => {
              const nextSubFrames = next.frameData.kind === 'multi'
                ? next.frameData.layers.length
                : 0;

              return total + nextSubFrames;
            }, 0);

            const bgCls = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            return (
              <tr
                className={`${bgCls} hover:bg-gray-100`}
                key={index}
              >
                <td
                  title={entry.name}
                  className={`${tdCls} w-full truncate`}
                  style={{ maxWidth: 150 }}
                >
                  {entry.name}
                </td>
                {/* <td className={`${tdCls}`}>{entry.frames.length > 1 ? 'Yes' : 'No'}</td> */}
                <td className={`${tdCls}`}>{entry.frames.length}</td>
                <td className={`${tdCls}`}>{subFrames}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }, [entryItems]);

  if (workspace === null) {
    return;
  }

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white">
        <div className="text-center text-sm font-bold text-slate-600 py-1">Entries</div>
        <div className="grow overflow-auto">
          <div className="relative">
            {table}
          </div>
        </div>
      </div>
    </Panel>
  );
}
