import FrameDataCanvas from '@/components/app/frame-canvas/FrameDataCanvas';
import FrameGuideCanvas from '@/components/app/frame-canvas/FrameGuideCanvas';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type FrameCanvasesProps = {
  frameData: VirtualFrameData;
};

export default function FrameCanvases({ frameData }: FrameCanvasesProps) {
  const guideCanvasBelow = React.useMemo(() => (
    <FrameGuideCanvas
      kind="below"
      containerClassName="absolute inset-0"
    />
  ), []);

  const guideCanvasAbove = React.useMemo(() => (
    <FrameGuideCanvas
      kind="above"
      containerClassName="absolute inset-0"
    />
  ), []);

  // TODO eventually implement panning (with middle-mouse click maybe)

  return (
    <div className="absolute inset-0">
      {guideCanvasBelow}

      <FrameDataCanvas
        frameData={frameData}
        containerClassName="absolute inset-0"
      />

      {guideCanvasAbove}
    </div>
  );
}
