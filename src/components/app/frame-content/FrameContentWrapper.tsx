import FrameContent from '@/components/app/frame-content/FrameContent';
import { S } from '@/lib/state/store/store-helper';

export default function FrameContentWrapper() {
  // console.log('Rendering FrameContentWrapper');

  const activeFrame = S.useStore()((state) => state.getActiveFrame());
  const activeSubframeIndex = S.useStore()((state) => state.cursor.subframeIndex);

  if (activeFrame === null) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        No frame selected
      </div>
    );
  }

  let frameData = activeFrame.frameData;

  if (frameData.kind === 'multi' && activeSubframeIndex !== null) {
    frameData = frameData.layers[activeSubframeIndex];
  }

  return (
    <FrameContent frameData={frameData} />
  );
}
