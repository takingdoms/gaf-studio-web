import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameCanvasWrapperMultiSubframeProps = DeepReadonly<{
  subframeData: LibGaf.GafFrameDataSingleLayer;
}>;

export default function FrameCanvasWrapperMultiSubframe({
  subframeData,
}: FrameCanvasWrapperMultiSubframeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <div><b>Selected Subframe:</b></div>
      <div>{subframeData.width}</div>
    </div>
  );
}
