import FrameControlsSingle from "@/components/app/controls/FrameControlsSingle";
import FrameInfoControls from "@/components/app/controls/FrameInfoControls";
import SubframeIndexControl from "@/components/app/controls/SubframeIndexControl";
import { S } from "@/lib/state/store/store-helper";

export default function FrameControls() {
  // console.log('Rendering FrameControls');

  const activeFrameIndex = S.useStore()((state) => state.cursor.frameIndex);
  const showSubframeIndexControl = S.useStore()((state) => (
    state.getActiveFrame()?.frameData.kind === 'multi'
  ));

  if (activeFrameIndex === null) {
    return (
      <div className="grow text-center text-gray-400 bg-white p-2">
        (No frame selected)
      </div>
    );
  }

  return (
    <div className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white space-y-2 px-4 py-2">
      <FrameInfoControls />

      <div className="self-center border-b border-dotted border-slate-500 w-1/2" />

      <div className="flex flex-col">
        <FrameControlsSingle />
        {showSubframeIndexControl && <SubframeIndexControl />}
      </div>
    </div>
  );
}
