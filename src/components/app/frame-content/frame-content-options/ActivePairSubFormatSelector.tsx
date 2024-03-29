import { TafSubFormat } from "@/lib/main-format";
import { useGlobalConfigStore } from "@/lib/state/global-config/global-config-store";

export default function ActivePairSubFormatSelector() {
  const activePairSubFormat = useGlobalConfigStore((state) => state.activePairSubFormat);
  const setActivePairSubFormat = useGlobalConfigStore((state) => state.actions.setActivePairSubFormat);

  return (
    <div className="flex space-x-1">
      <div className="self-center text-xs text-slate-500 font-semibold">
        View:
      </div>
      <SubFormatOption
        subFormat="taf_1555"
        isActive={activePairSubFormat === 'taf_1555'}
        onClick={() => setActivePairSubFormat('taf_1555')}
      />
      <SubFormatOption
        subFormat="taf_4444"
        isActive={activePairSubFormat === 'taf_4444'}
        onClick={() => setActivePairSubFormat('taf_4444')}
      />
    </div>
  );
}

function SubFormatOption({
  subFormat,
  isActive,
  onClick,
}: {
  subFormat: TafSubFormat;
  isActive: boolean;
  onClick: () => void;
}) {
  let bgCls = subFormat === 'taf_1555'
    ? ('border-emerald-400 from-emerald-300 to-emerald-400 text-emerald-800')
    : ('border-cyan-400 from-cyan-300 to-cyan-400 text-cyan-800');

  if (!isActive) {
    bgCls += ' opacity-50 hover:opacity-70 transition-opacity';
  }

  return (
    <button
      className={`p-1 flex items-stretch text-xs font-bold bg-gradient-to-b border`
        + ` transition-colors ${bgCls}`}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
    >
      <input
        className="cursor-pointer mr-1"
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
