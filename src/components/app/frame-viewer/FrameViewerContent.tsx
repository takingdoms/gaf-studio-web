import FrameCanvasWrapper from '@/components/app/frame-canvas/FrameCanvasWrapper';
import FrameSelectorList from '@/components/app/frame-selector/FrameSelectorList';
import SubframeSelectorList from '@/components/app/frame-selector/SubframeSelectorList';
import FrameViewerSeparator from '@/components/app/frame-viewer/FrameViewerSeparator';
import { S } from '@/lib/state/store/store-helper';

export default function FrameViewerContent() {
  // console.log('Rendering FrameViewerContent');

  const showFrameCanvasWrapper = S.useStore()((state) => state.cursor.entryIndex !== null);
  const showSubframeSelector = S.useStore()((state) => (
    state.cursor.entryIndex !== null && state.cursor.frameIndex !== null
  ));

  return (<>
    <div className="flex flex-col">
      <FrameSelectorList />
    </div>

    <FrameViewerSeparator />

    <div className="grow flex flex-col">
      {showFrameCanvasWrapper && <FrameCanvasWrapper />}
    </div>

    <FrameViewerSeparator />

    <div className="flex flex-col">
      {showSubframeSelector && <SubframeSelectorList />}
    </div>
  </>);
}
