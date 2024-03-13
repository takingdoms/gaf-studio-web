import FrameCanvases from '@/components/app/frame-canvas/FrameCanvases';
import FrameContentBackground from '@/components/app/frame-content/FrameContentBackground';
import FrameContentOptionsDiv from '@/components/app/frame-content/frame-content-options/FrameContentOptionsDiv';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import { VirtualGafUtils } from '@/lib/virtual-gaf/virtual-gaf-utils';

type FrameContentProps = {
  frameData: VirtualFrameData;
};

export default function FrameContent({ frameData }: FrameContentProps) {
  const [boundsWidth, boundsHeight] = VirtualGafUtils.calcBounds(frameData);

  return (
    <div className="w-full h-full flex flex-col">
      <FrameContentOptionsDiv />
      <div className="grow border border-slate-300 overflow-auto">
        <div
          className="w-full h-full relative"
          style={{
            minWidth: boundsWidth + 1,
            minHeight: boundsHeight + 1,
          }}
        >
          <FrameContentBackground />
          <FrameCanvases frameData={frameData} />
        </div>
      </div>
    </div>
  );
}
