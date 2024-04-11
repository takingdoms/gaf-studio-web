import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

const thCls = 'px-2 py-1 text-left border~ border-gray-300';
const tdCls = 'px-2 py-1';

export default function EntryListTable() {
  // console.log('Rendering EntryListTable');

  // this component is probably cheap enough to re-render every time entries is changed
  const entries = S.useEntries();
  const activeEntryIndex = S.useActiveEntryIndex();
  const setActiveEntryIndex = S.useSetActiveEntryIndex();

  return (
    <table className="text-xs text-black">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className={`${thCls}`}>#</th>
          <th className={`${thCls} w-full`}>Name</th>
          <th className={`${thCls}`}>Frames</th>
          <th className={`${thCls}`}>Subframes</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => {
          const isActive = index === activeEntryIndex;

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
                setActiveEntryIndex(index);
              }}
            >
              <td className={`${tdCls}`}>{index + 1}</td>
              <td
                title={entry.name}
                className={`${tdCls} w-full truncate`}
                style={{ maxWidth: 150 }}
              >
                {entry.name}
              </td>
              <td className={`${tdCls}`}>{entry.frames.length}</td>
              <td className={`${tdCls}`}>{subFrames}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
