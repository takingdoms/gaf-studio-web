import { WorkspaceControllerContext } from '@/components/app/logical/WorkspaceControllerContext';
import WorkspaceSubFormat from '@/components/app/workspace-format/WorkspaceSubFormat';
import Panel from '@/components/ui/panel/Panel';
import { TAF_SUB_FORMATS, TAF_SUB_FORMAT_TO_LABEL, TafSubFormat } from '@/lib/gaf-studio/main-format';
import React from 'react';

export default function WorkspaceFormatPanel() {
  const workspaceController = React.useContext(WorkspaceControllerContext);

  const onClickSubFormat = React.useCallback((subFormat: TafSubFormat) => {
    if (workspaceController === null || workspaceController.state.format === 'gaf') {
      return;
    }

    const workspace = workspaceController.state;

    if (workspace.currentGafs[subFormat] === null) {
      const subFormatLabel = TAF_SUB_FORMAT_TO_LABEL[subFormat];
      const yes = window.confirm(`The workspace does not contain the sub-format`
        + ` "${subFormatLabel}". Do you want to create a blank one now?`);

      if (yes) {
        workspaceController.createSubFormat(subFormat, true);
      }

      return;
    }

    workspaceController.setActiveSubFormat(subFormat);
  }, [workspaceController]);

  if (workspaceController === null) {
    return;
  }

  const workspace = workspaceController.state;

  const bgCls = workspace.format === 'gaf'
    ? 'border-orange-300 from-orange-200 to-orange-300 text-orange-800'
    : 'border-orange-300 from-orange-200 to-orange-300 text-orange-800';

  return (
    <Panel>
      <div
        className={`p-2 text-center text-sm font-bold bg-gradient-to-b border ${bgCls}`}
      >
        <span>Main format:{' '}</span>
        <span>{workspace.format === 'gaf' ? 'GAF' : 'TAF'}</span>
      </div>
      {workspace.format === 'taf' && (<>
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
                onClick={() => onClickSubFormat(subFormat)}
              />
            </div>
          ))}
        </div>
      </>)}
    </Panel>
  );
}
