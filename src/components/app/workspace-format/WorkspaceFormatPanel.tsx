import WorkspaceSubFormat from '@/components/app/workspace-format/WorkspaceSubFormat';
import Panel from '@/components/ui/panel/Panel';
import { TAF_SUB_FORMATS } from '@/lib/main-format';
import { useWorkspaceStore } from '@/lib/react/use-workspace-store';

export default function WorkspaceFormatPanel() {
  // console.log('Rendering WorkspaceFormatPanel');

  const useTafStore = useWorkspaceStore('taf');
  const isGaf = useTafStore === null;

  const bgCls = isGaf
    ? 'border-orange-300 bg-orange-200 text-orange-700'
    : 'border-violet-300 bg-violet-200 text-violet-700';

  return (
    <Panel>
      <div
        className={`p-1 text-center text-sm font-bold bg-gradient-to-b border-2 ${bgCls}`}
      >
        <span>Current format:{' '}</span>
        <span>{isGaf ? 'GAF' : 'TAF'}</span>
      </div>
      {useTafStore && (<>
        <div className="p-1 text-xs text-center text-slate-500 font-bold uppercase~">
          View sub-format:
        </div>
        <div className="flex">
          {TAF_SUB_FORMATS.map((subFormat) => (
            <div
              key={subFormat}
              className="basis-full flex flex-col"
            >
              <WorkspaceSubFormat
                subFormat={subFormat}
                useTafStore={useTafStore}
              />
            </div>
          ))}
        </div>
      </>)}
    </Panel>
  );
}
