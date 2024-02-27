import EntryControls from '@/components/app/controls/EntryControls';
import FrameControls from '@/components/app/controls/FrameControls';
import CollapsibleHeader from '@/components/ui/collapsible/CollapsibleHeader';
import Panel from '@/components/ui/panel/Panel';
import React from 'react';

export default function ControlsPanel() {
  const [entryExpanded, setEntryExpanded] = React.useState(true);
  const [frameExpanded, setFrameExpanded] = React.useState(true);

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden">
        <div className="h-full grow flex flex-col overflow-hidden text-sm">
          <div className="flex flex-col overflow-hidden">
            <CollapsibleHeader
              expanded={entryExpanded}
              setExpanded={setEntryExpanded}
            >
              Entry Control
            </CollapsibleHeader>
            {entryExpanded && <EntryControls />}
          </div>

          <div className="my-1" />

          <div className="grow flex flex-col overflow-hidden">
            <CollapsibleHeader
              expanded={frameExpanded}
              setExpanded={setFrameExpanded}
            >
              Frame Control
            </CollapsibleHeader>
            {frameExpanded && <FrameControls />}
          </div>
        </div>
      </div>
    </Panel>
  );
}
