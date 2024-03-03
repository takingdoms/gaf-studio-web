import FrameDataImage from '@/components/app/frame-data-image/FrameDataImage';
import { VirtualGafFrameDataSingleLayer } from '@/lib/gaf-studio/virtual-gaf/virtual-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameCanvasWrapperMultiSubframeProps = DeepReadonly<{
  subframeData: VirtualGafFrameDataSingleLayer;
}>;

export default function FrameCanvasWrapperMultiSubframe({
  subframeData,
}: FrameCanvasWrapperMultiSubframeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
      {/* <div><b>Selected Subframe:</b></div> */}
      <FrameDataImage frameData={subframeData} />
    </div>
  );
}
