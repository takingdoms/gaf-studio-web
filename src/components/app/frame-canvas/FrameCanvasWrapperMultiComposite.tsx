import FrameDataCompositeImage from '@/components/app/frame-data-image/FrameDataCompositeImage';
import { VirtualGafFrameDataMultiLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameCanvasWrapperMultiCompositeProps = {
  frameData: VirtualGafFrameDataMultiLayer;
};

export default function FrameCanvasWrapperMultiComposite({
  frameData,
}: FrameCanvasWrapperMultiCompositeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* <div><b>Selected Frame (multi):</b></div> */}
      <FrameDataCompositeImage frameData={frameData} />
    </div>
  );
}
