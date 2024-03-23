import EntryControls from '@/components/app/controls/EntryControls';
import FrameControls from '@/components/app/controls/FrameControls';
import SubframeControls from '@/components/app/controls/SubframeControls';
import CollapsibleHeader from '@/components/ui/collapsible/CollapsibleHeader';
import Panel from '@/components/ui/panel/Panel';
import { useWorkspaceStore } from '@/lib/react/use-workspace-store';
import React from 'react';

export default function ControlsPanel() {
  // console.log('Rendering ControlsPanel');

  const [entryExpanded, setEntryExpanded] = React.useState(true);
  const [frameExpanded, setFrameExpanded] = React.useState(true);
  const [subframeExpanded, setSubframeExpanded] = React.useState(true);

  const showFrameControls = useWorkspaceStore()((state) => state.cursor.entryIndex !== null);

  const showSubframeControls = useWorkspaceStore()((state) => (
    state.cursor.entryIndex !== null &&
    state.getActiveFrame()?.frameData.kind === 'multi'
  ));

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden">
        <div className="h-full grow flex flex-col overflow-hidden text-sm space-y-2">
          <div className="flex flex-col overflow-hidden">
            <CollapsibleHeader
              expanded={entryExpanded}
              setExpanded={setEntryExpanded}
            >
              Sequence Control
            </CollapsibleHeader>
            {entryExpanded && <EntryControls />}
          </div>

          <div className="flex flex-col overflow-hidden">
            <CollapsibleHeader
              expanded={frameExpanded}
              setExpanded={setFrameExpanded}
            >
              Frame Control
            </CollapsibleHeader>
            {showFrameControls && frameExpanded && <FrameControls />}
          </div>

          {showSubframeControls && (
            <div className="flex flex-col overflow-hidden">
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
