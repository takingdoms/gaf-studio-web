import WorkspaceSubFormat from '@/components/app/workspace-format/WorkspaceSubFormat';
import Panel from '@/components/ui/panel/Panel';
import { TAF_SUB_FORMATS } from '@/lib/main-format';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function WorkspaceFormatPanel() {
  // console.log('Rendering WorkspaceFormatPanel');

  const format = S.useFormat();

  const bgCls = format === 'gaf'
    ? 'border-orange-300 bg-orange-200 text-orange-700'
    : 'border-violet-300 bg-violet-200 text-violet-700';

  return (
    <Panel>
      <div
        className={`p-1 text-center text-sm font-bold bg-gradient-to-b border-2 ${bgCls}`}
      >
        <span>Current format:{' '}</span>
        <span>{format === 'gaf' ? 'GAF' : 'TAF'}</span>
      </div>
      {format === 'taf' && (<>
        <div className="p-1 text-xs text-center text-slate-500 font-bold uppercase~">
          View sub-format:
        </div>
        <div className="flex">
          {TAF_SUB_FORMATS.map((subFormat) => (
            <div
              key={subFormat}
              className="basis-full flex flex-col"
            >
              <WorkspaceSubFormat subFormat={subFormat} />
            </div>
          ))}
        </div>
      </>)}
    </Panel>
  );
}
