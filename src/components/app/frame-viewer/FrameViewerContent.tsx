import FrameCanvasWrapper from '@/components/app/frame-canvas/FrameCanvasWrapper';
import MainFrameSelector from '@/components/app/frame-selector/MainFrameSelector';
import SubframeSelector from '@/components/app/frame-selector/SubframeSelector';
import FrameViewerSeparator from '@/components/app/frame-viewer/FrameViewerSeparator';

export default function FrameViewerContent() {
  const subframeSelector = <SubframeSelector />;

  return (<>
    <div className="flex flex-col">
      <MainFrameSelector />
    </div>

    <FrameViewerSeparator />

    {subframeSelector !== null && (<>
      <div className="flex flex-col">
        {subframeSelector}
      </div>

      <FrameViewerSeparator />
    </>)}

    <div className="grow flex flex-col">
      <FrameCanvasWrapper />
    </div>
  </>);
}
