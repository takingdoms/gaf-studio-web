import React from 'react';

type WorkspaceInfoTableProps = {
  data: Array<[string, React.ReactNode]>;
};

export default function WorkspaceInfoTable({ data }: WorkspaceInfoTableProps) {
  return (
    <table className="text-sm">
      <tbody>
        {data.map(([label, value], idx) => (
          <tr key={idx}>
            <th className="px-1 py-0.5 w-0 whitespace-nowrap">
              {label}:
            </th>
            <td className="px-1 py-0.5">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
