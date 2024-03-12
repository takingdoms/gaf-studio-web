import FrameContentBackground from '@/components/app/frame-content/FrameContentBackground';
import FrameContentOptionsDiv from '@/components/app/frame-content/frame-content-options/FrameContentOptionsDiv';
import FrameDataImageRenderer from '@/components/app/image-renderer/FrameDataImageRenderer';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameContentProps = {
  frameData: VirtualFrameData;
};

export default function FrameContent({ frameData }: FrameContentProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <FrameContentOptionsDiv />
      <div className="grow relative border border-slate-300">
        <FrameContentBackground />
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
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
