import FrameDataCompositeImage from '@/components/app/frame-data-image/FrameDataCompositeImage';
import { VirtualFrameDataMultiLayer } from '@/lib/virtual-gaf/virtual-gaf';

type FrameCanvasWrapperMultiCompositeProps = {
  frameData: VirtualFrameDataMultiLayer;
};

export default function FrameCanvasWrapperMultiComposite({
  frameData,
}: FrameCanvasWrapperMultiCompositeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
      <FrameDataCompositeImage
        frameData={frameData}
        contain={false}
        smoothing={false}
      />
    </div>
  );
}
