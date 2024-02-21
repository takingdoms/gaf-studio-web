import { TafSubFormat } from '@/lib/gaf-studio/main-format';
import { WorkspaceTaf } from '@/lib/gaf-studio/state/workspace';
import { DeepReadonly } from 'ts-essentials';

type WorkspaceSubFormatProps = {
  subFormat: TafSubFormat;
  workspace: DeepReadonly<WorkspaceTaf>;
  onClick: () => void;
};

export default function WorkspaceSubFormat({
  subFormat,
  workspace,
  onClick,
}: WorkspaceSubFormatProps) {
  let bgCls: string;

  const gafForFormat = workspace.currentGafs[subFormat];
  const isActive = subFormat === workspace.activeSubFormat;

  if (gafForFormat === null) {
    bgCls = 'border-gray-300 from-gray-50 to-gray-200 text-gray-400 hover:text-gray-500'
      + ' hover:border-gray-400'
  }
  else if (isActive) {
    bgCls = subFormat === 'taf_1555'
      ? ('border-emerald-300 from-emerald-200 to-emerald-300 text-emerald-800')
      : ('border-cyan-300 from-cyan-200 to-cyan-300 text-cyan-800');
  }
  else {
    bgCls = 'opacity-40 hover:opacity-60 transition-opacity';
    bgCls += subFormat === 'taf_1555'
      ? (' border-emerald-300 from-emerald-200 to-emerald-300 text-emerald-800')
      : (' border-cyan-300 from-cyan-200 to-cyan-300 text-cyan-800');
  }

  return (
    <button
      className={`p-2 flex items-stretch text-xs font-bold bg-gradient-to-b border`
         + ` transition-colors ${bgCls}`}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
    >
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={isActive}
        onChange={() => {
          // do nothing (the button does it)
        }}
      />
      <div className="grow flex justify-center items-center">
        {subFormat === 'taf_1555' ? '1555' : '4444'}
      </div>
    </button>
  );
}
