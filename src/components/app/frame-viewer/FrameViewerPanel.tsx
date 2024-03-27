import FrameContentWrapper from '@/components/app/frame-content/FrameContentWrapper';
import FrameSelectorList from '@/components/app/frame-selector/FrameSelectorList';
import SubframeSelectorList from '@/components/app/frame-selector/SubframeSelectorList';
import FrameViewerSeparator from '@/components/app/frame-viewer/FrameViewerSeparator';
import Panel from '@/components/ui/panel/Panel';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function FrameViewerPanel() {
  const showFrameContentWrapper = S.useHasActiveEntry();
  const showSubframeSelector = S.useHasActiveFrame();

  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden">
        <div className="flex flex-col">
          <FrameSelectorList />
        </div>

        <FrameViewerSeparator />

        <div className="grow overflow-hidden">
          {showFrameContentWrapper && <FrameContentWrapper />}
        </div>

        <FrameViewerSeparator />

        <div className="flex flex-col">
          {showSubframeSelector && <SubframeSelectorList />}
        </div>
      </div>
    </Panel>
  );
}
