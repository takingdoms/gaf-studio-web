import LibGaf from 'lib-gaf';
import { DeepReadonly } from 'ts-essentials';

type FrameCanvasWrapperMultiCompositeProps = DeepReadonly<{
  frameData: LibGaf.GafFrameDataMultiLayer;
}>;

export default function FrameCanvasWrapperMultiComposite({
  frameData,
}: FrameCanvasWrapperMultiCompositeProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <div><b>Selected Frame (multi):</b></div>
      <div>{frameData.layers.length} layers</div>
    </div>
  );
}
