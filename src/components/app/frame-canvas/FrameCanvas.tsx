import FrameCanvasBackground from '@/components/app/frame-canvas/FrameCanvasBackground';
import FrameCanvasOptionsDiv from '@/components/app/frame-canvas/frame-canvas-options/FrameCanvasOptionsDiv';
import FrameDataCompositeImage from '@/components/app/frame-data-image/FrameDataCompositeImage';
import FrameDataImage from '@/components/app/frame-data-image/FrameDataImage';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type FrameCanvasProps = {
  frameData: VirtualFrameData;
};

export default function FrameCanvas({ frameData }: FrameCanvasProps) {
  const image = React.useMemo(() => {
    return frameData.kind === 'single' ? (
      <FrameDataImage
        frameData={frameData}
        contain={false}
        smoothing={false}
      />
    ) : (
      <FrameDataCompositeImage
        frameData={frameData}
        contain={false}
        smoothing={false}
      />
    );
  }, [frameData]);

  return (
    <div className="w-full h-full flex flex-col">
      <FrameCanvasOptionsDiv />
      <div className="grow relative border border-slate-300">
        <FrameCanvasBackground />
        <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden">
          {image}
        </div>
      </div>
    </div>
  );
}
