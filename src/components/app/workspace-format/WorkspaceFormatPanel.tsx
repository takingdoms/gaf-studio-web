import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import WorkspaceSubFormat from '@/components/app/workspace-format/WorkspaceSubFormat';
import Panel from '@/components/ui/panel/Panel';
import { TAF_SUB_FORMATS } from '@/lib/gaf-studio/main-format';
import { WorkspaceTaf } from '@/lib/gaf-studio/state/workspace-taf';
import React from 'react';

export default function WorkspaceFormatPanel() {
  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const bgCls = workspace.state.format === 'gaf'
    ? 'border-orange-300 bg-orange-200 text-orange-700'
    : 'border-violet-300 bg-violet-200 text-violet-700';

  return (
    <Panel>
      <div
        className={`p-1 text-center text-sm font-bold bg-gradient-to-b border-2 ${bgCls}`}
      >
        <span>Current format:{' '}</span>
        <span>{workspace.state.format === 'gaf' ? 'GAF' : 'TAF'}</span>
      </div>
      {workspace instanceof WorkspaceTaf && (<>
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
                workspace={workspace}
              />
            </div>
          ))}
        </div>
      </>)}
    </Panel>
  );
}
