import FrameCanvasBackground from '@/components/app/frame-canvas/FrameCanvasBackground';
import FrameCanvasOptionsDiv from '@/components/app/frame-canvas/frame-canvas-options/FrameCanvasOptionsDiv';
import FrameDataImageRenderer from '@/components/app/image-renderer/FrameDataImageRenderer';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameCanvasProps = {
  frameData: VirtualFrameData;
};

export default function FrameCanvas({ frameData }: FrameCanvasProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <FrameCanvasOptionsDiv />
      <div className="grow relative border border-slate-300">
        <FrameCanvasBackground />
        <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden">
          <FrameDataImageRenderer
            frameData={frameData}
            displace={true}
            contain={false}
            smoothing={false}
          />
        </div>
      </div>
    </div>
  );
}
