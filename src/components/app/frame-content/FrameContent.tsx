import FrameContentBackground from '@/components/app/frame-content/FrameContentBackground';
import FrameContentOptionsDiv from '@/components/app/frame-content/frame-content-options/FrameContentOptionsDiv';
import MainCanvases from '@/components/app/main-canvases/MainCanvases';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';

type FrameContentProps = {
  frameData: VirtualFrameData;
};

export default function FrameContent({ frameData }: FrameContentProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <FrameContentOptionsDiv />
      <div className="grow border border-slate-300 overflow-hidden">
        <div className="w-full h-full relative">
          <FrameContentBackground />
          <MainCanvases frameData={frameData} />
        </div>
      </div>
    </div>
  );
}
