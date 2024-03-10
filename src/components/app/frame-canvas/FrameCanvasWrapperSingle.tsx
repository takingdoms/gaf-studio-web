import FrameDataImage from "@/components/app/frame-data-image/FrameDataImage";
import { VirtualFrameDataSingleLayer } from "@/lib/virtual-gaf/virtual-gaf";

type FrameCanvasWrapperSingleProps = {
  frameData: VirtualFrameDataSingleLayer;
};

export default function FrameCanvasWrapperSingle({
  frameData,
}: FrameCanvasWrapperSingleProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
      <FrameDataImage
        frameData={frameData}
        contain={false}
        smoothing={false}
      />
    </div>
  );
}
