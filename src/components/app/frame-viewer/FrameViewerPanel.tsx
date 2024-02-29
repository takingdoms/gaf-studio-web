import FrameViewerContent from '@/components/app/frame-viewer/FrameViewerContent';
import Panel from '@/components/ui/panel/Panel';

export default function FrameViewerPanel() {
  return (
    <Panel>
      <div className="grow flex flex-col overflow-hidden bg-white~">
        <FrameViewerContent />
      </div>
    </Panel>
  );
}
