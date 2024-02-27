import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type EntryListTableProps = DeepReadonly<{
  entries: LibGaf.GafEntry[];
  activeEntry: LibGaf.GafEntry | undefined;
  setActiveEntry: (entry: DeepReadonly<LibGaf.GafEntry> | undefined) => void;
}>;

const thCls = 'px-2 py-1 text-left border~ border-gray-300';
const tdCls = 'px-2 py-1';

export default function EntryListTable({
  entries,
  activeEntry,
  setActiveEntry,
}: EntryListTableProps) {
  return (
    <table className="text-xs text-black">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className={`${thCls} w-full`}>Name</th>
          {/* <th className={`${thCls}`}>Animate</th> */}
          <th className={`${thCls}`}>Frames</th>
          <th className={`${thCls}`}>Subframes</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => {
          const isActive = entry === activeEntry;

          const subFrames = entry.frames.reduce((total, next) => {
            const nextSubFrames = next.frameData.kind === 'multi'
              ? next.frameData.layers.length
              : 0;

            return total + nextSubFrames;
          }, 0);

          let bgCls: string;

          if (isActive) {
            bgCls = 'bg-sky-200';
          } else {
            bgCls = index % 2 === 0
              ? 'bg-white hover:bg-sky-100'
              : 'bg-gray-50 hover:bg-sky-100';
          }

          return (
            <tr
              key={index}
              className={`${bgCls} cursor-pointer`}
              onClick={() => {
                setActiveEntry(entry);
              }}
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
}
