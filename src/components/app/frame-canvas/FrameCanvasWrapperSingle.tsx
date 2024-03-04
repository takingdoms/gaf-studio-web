import FrameDataImage from "@/components/app/frame-data-image/FrameDataImage";
import { VirtualGafFrameDataSingleLayer } from "@/lib/gaf-studio/virtual-gaf/virtual-gaf";

type FrameCanvasWrapperSingleProps = {
  frameData: VirtualGafFrameDataSingleLayer;
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
