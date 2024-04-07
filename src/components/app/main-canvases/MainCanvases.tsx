import BoundsCanvas from '@/components/app/main-canvases/BoundsCanvas';
import CrossCanvas from '@/components/app/main-canvases/CrossCanvas';
import GridCanvas from '@/components/app/main-canvases/GridCanvas';
import ImageCanvas from '@/components/app/main-canvases/ImageCanvas';
import MouseCanvas from '@/components/app/main-canvases/MouseCanvas';
import OriginBoundsCanvas from '@/components/app/main-canvases/OriginBoundsCanvas';
import { useCanvasConfigStore } from '@/lib/state/canvas/canvas-config-store';
import { VirtualFrameData } from '@/lib/virtual-gaf/virtual-gaf';
import React from 'react';

type MainCanvasesProps = {
  frameData: VirtualFrameData;
};

export default function MainCanvases({ frameData }: MainCanvasesProps) {
  const gridCanvas = React.useMemo(() => <GridCanvas />, []);
  const imageCanvas = React.useMemo(() => <ImageCanvas frameData={frameData} />, [frameData]);
  const crossCanvas = React.useMemo(() => <CrossCanvas />, []);
  const boundsCanvas = React.useMemo(() => <BoundsCanvas frameData={frameData} />, [frameData]);
  const originBoundsCanvas = React.useMemo(() => <OriginBoundsCanvas frameData={frameData} />, [frameData]);

  const order = useCanvasConfigStore((state) => state.mainCanvasLayerOrder);

  return (
    <div className="absolute inset-0">
      {[...order].map((key) => (
        <React.Fragment key={key}>
          {
            key === 'GRID' ? gridCanvas
            : key === 'IMAGE' ? imageCanvas
            : key === 'CROSS' ? crossCanvas
            : key === 'BOUNDS' ? boundsCanvas
            : key === 'O_BOUNDS' ? originBoundsCanvas
            : (() => {throw new Error(`Unknown layer key: ${key}`)})()
          }
        </React.Fragment>
      ))}
      <MouseCanvas />
    </div>
  );
}
