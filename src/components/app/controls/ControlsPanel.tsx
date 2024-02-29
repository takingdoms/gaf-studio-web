import EntryControls from '@/components/app/controls/EntryControls';
import FrameControls from '@/components/app/controls/FrameControls';
import SubframeControls from '@/components/app/controls/SubframeControls';
import { WorkspaceContext } from '@/components/app/logical/WorkspaceContext';
import CollapsibleHeader from '@/components/ui/collapsible/CollapsibleHeader';
import Panel from '@/components/ui/panel/Panel';
import React from 'react';

export default function ControlsPanel() {
  const [entryExpanded, setEntryExpanded] = React.useState(true);
  const [frameExpanded, setFrameExpanded] = React.useState(true);
  const [subframeExpanded, setSubframeExpanded] = React.useState(true);

  const workspace = React.useContext(WorkspaceContext);

  if (workspace === null) {
    return;
  }

  const showSubframeControls = workspace.getActiveFrame()?.frameData.kind === 'multi';

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden">
        <div className="h-full grow flex flex-col overflow-hidden text-sm space-y-2">
          <div className="flex flex-col overflow-hidden">
            <CollapsibleHeader
              expanded={entryExpanded}
              setExpanded={setEntryExpanded}
            >
              Entry Control
            </CollapsibleHeader>
            {entryExpanded && <EntryControls />}
          </div>

          <div className={`${showSubframeControls ? '' : 'grow'} flex flex-col overflow-hidden`}>
            <CollapsibleHeader
              expanded={frameExpanded}
              setExpanded={setFrameExpanded}
            >
              Frame Control
            </CollapsibleHeader>
            {frameExpanded && <FrameControls />}
          </div>

          {showSubframeControls && (
            <div className="grow flex flex-col overflow-hidden">
              <CollapsibleHeader
                expanded={subframeExpanded}
                setExpanded={setSubframeExpanded}
              >
                Subframe Control
              </CollapsibleHeader>
              {subframeExpanded && <SubframeControls />}
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}
