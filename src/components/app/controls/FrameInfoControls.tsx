import { S } from '@/lib/state/store/store-helper';


export default function FrameInfoControls() {
  const activeFrameDuration = S.useActiveFrameDuration();

  if (activeFrameDuration === null) {
    throw new Error(`Can't use this component when there's no active frame.`);
  }

  return (
    <div className="flex flex-col mx-2 space-y-1">
      <div className="self-center flex items-baseline">
        <div>Frame duration:</div>
        <div className="grow font-mono">
          &nbsp;{activeFrameDuration}
        </div>
      </div>
    </div>
  );
}
