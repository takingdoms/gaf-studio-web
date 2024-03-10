import { TafSubFormat, TAF_SUB_FORMAT_TO_LABEL } from '@/lib/main-format';
import { TafWorkspaceStore } from '@/lib/react/workspace-store-context';
import React from 'react';

type WorkspaceSubFormatProps = {
  subFormat: TafSubFormat;
  useTafStore: TafWorkspaceStore;
};

export default function WorkspaceSubFormat({
  subFormat,
  useTafStore,
}: WorkspaceSubFormatProps) {
  // console.log('Rendering WorkspaceSubFormat');

  let bgCls: string;

  // const gafForFormat = workspace.state.currentGafs[subFormat];
  const currentGafs = useTafStore((state) => state.currentGafs); // TODO useShallow probably
  const gafForFormat = currentGafs[subFormat];
  const isActive = subFormat === useTafStore((state) => state.activeSubFormat);
  const setActiveSubFormat = useTafStore((state) => state.setActiveSubFormat);

  const onClickActivate = React.useCallback(() => {
    if (currentGafs[subFormat] === null) {
      const subFormatLabel = TAF_SUB_FORMAT_TO_LABEL[subFormat];
      const yes = window.confirm(`The workspace does not contain the sub-format`
        + ` "${subFormatLabel}". Do you want to create a blank one now?`);

      if (!yes) {
        return;
      }
    }

    setActiveSubFormat(subFormat);
  }, [currentGafs, subFormat, setActiveSubFormat]);

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
      className={`p-1 flex items-stretch text-xs font-bold bg-gradient-to-b border`
         + ` transition-colors ${bgCls}`}
      onClick={(ev) => {
        ev.stopPropagation();
        onClickActivate();
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
