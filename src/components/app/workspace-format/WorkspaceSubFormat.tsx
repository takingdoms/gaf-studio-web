import { TafSubFormat } from '@/lib/main-format';
import { TafPairS } from '@/lib/state/workspace/workspace-context/taf-pair-workspace-helper';

type WorkspaceSubFormatProps = {
  subFormat: TafSubFormat;
};

export default function WorkspaceSubFormat({
  subFormat,
}: WorkspaceSubFormatProps) {
  // console.log('Rendering WorkspaceSubFormat');

  const activeSubFormat = TafPairS.useActiveSubFormat();
  const setActiveSubFormat = TafPairS.useSetActiveSubFormat();

  const isActive = activeSubFormat === subFormat;

  let bgCls: string;

  if (isActive) {
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
      className={`p-1 flex items-stretch text-xs font-bold bg-gradient-to-b border`
         + ` transition-colors ${bgCls}`}
      onClick={(ev) => {
        ev.stopPropagation();
        setActiveSubFormat(subFormat);
      }}
    >
      <input
        className="cursor-pointer"
        type="radio"
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
