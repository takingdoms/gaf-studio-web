import BoundsCanvas from '@/components/app/frame-canvases/BoundsCanvas';
import CrossCanvas from '@/components/app/frame-canvases/CrossCanvas';
import GridCanvas from '@/components/app/frame-canvases/GridCanvas';
import ImageCanvas from '@/components/app/frame-canvases/ImageCanvas';
import OriginBoundsCanvas from '@/components/app/frame-canvases/OriginBoundsCanvas';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type FrameCanvasesProps = {
  frameData: VirtualFrameData;
};

export default function FrameCanvases({ frameData }: FrameCanvasesProps) {
  const gridCanvas = React.useMemo(() => <GridCanvas />, []);
  const imageCanvas = React.useMemo(() => <ImageCanvas frameData={frameData} />, [frameData]);
  const crossCanvas = React.useMemo(() => <CrossCanvas />, []);
  const boundsCanvas = React.useMemo(() => <BoundsCanvas frameData={frameData} />, [frameData]);
  const originBoundsCanvas = React.useMemo(() => <OriginBoundsCanvas frameData={frameData} />, [frameData]);

  // TODO eventually implement panning (with middle-mouse click maybe)

  return (
    <div className="absolute inset-0">
      {/* TODO ability to freely order these */}
      {gridCanvas}
      {imageCanvas}
      {crossCanvas}
      {boundsCanvas}
      {originBoundsCanvas}
    </div>
  );
}
