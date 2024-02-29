import FrameCanvasWrapper from '@/components/app/frame-canvas/FrameCanvasWrapper';
import MainFrameSelector from '@/components/app/frame-selector/MainFrameSelector';
import SubframeSelector from '@/components/app/frame-selector/SubframeSelector';
import FrameViewerSeparator from '@/components/app/frame-viewer/FrameViewerSeparator';

export default function FrameViewerContent() {
  return (<>
    <div className="flex flex-col">
      <MainFrameSelector />
    </div>

    <FrameViewerSeparator />

    <div className="grow flex flex-col">
      <FrameCanvasWrapper />
    </div>

    <FrameViewerSeparator />

    <div className="flex flex-col">
      <SubframeSelector />
    </div>
  </>);
}
