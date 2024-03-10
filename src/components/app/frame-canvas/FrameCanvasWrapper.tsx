import FrameCanvasWrapperMultiComposite from '@/components/app/frame-canvas/FrameCanvasWrapperMultiComposite';
import FrameCanvasWrapperSingle from '@/components/app/frame-canvas/FrameCanvasWrapperSingle';
import { S } from '@/lib/state/store/store-helper';

export default function FrameCanvasWrapper() {
  // console.log('Rendering FrameCanvasWrapper');

  // TODO use shallow probably or something like useEntryProps
  // ^ actually nah. whenever the activeFrame changes everything from here and down should re-render anyway
  const activeFrame = S.useStore()((state) => state.getActiveFrame());
  const activeSubframeIndex = S.useStore()((state) => state.cursor.subframeIndex);

  if (activeFrame === null) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        No frame selected
      </div>
    );
  }

  const frameData = activeFrame.frameData;

  if (frameData.kind === 'single') {
    return (
      <FrameCanvasWrapperSingle
        frameData={frameData}
      />
    );
  }

  if (activeSubframeIndex === null) {
    return (
      <FrameCanvasWrapperMultiComposite
        frameData={frameData}
      />
    );
  }

  const subframeData = frameData.layers[activeSubframeIndex];

  return (
    <FrameCanvasWrapperSingle
      frameData={subframeData}
    />
  );
}
