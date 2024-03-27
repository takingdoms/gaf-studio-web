import FrameDataControls from "@/components/app/controls/FrameDataControls";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

// should never be called if there's no active frame
export default function SubframeControls() {
  // console.log('Rendering SubframeControls');

  const format = S.useFormat();
  const activeSubframeFrameDataProps = S.useShallowActiveSubframeDataProps();
  const modifyActiveSubframeData = S.useModifyActiveSubframeData();

  if (activeSubframeFrameDataProps === null) {
    return (
      <div className="grow text-center text-gray-400 bg-white p-2">
        (No subframe selected)
      </div>
    );
  }

  return (
    <div className="grow flex flex-col overflow-y-auto overflow-x-hidden bg-white px-4 py-2">
      <FrameDataControls
        frameData={activeSubframeFrameDataProps}
        isSubframe={true}
        isGaf={format === 'gaf'}
        modify={modifyActiveSubframeData}
      />
    </div>
  );
}
