import NumberControl from '@/components/ui/control/NumberControl';
import { S } from '@/lib/state/workspace/workspace-context/any-workspace-helper';

export default function SubframeIndexControl() {
  // console.log('Rendering SubframeIndexControl');

  const activeFrameLayersLength = S.useActiveFrameLayersLength();
  const activeSubframeIndex = S.useActiveSubframeIndex();
  const setActiveSubframeIndex = S.useSetActiveSubframeIndex();

  const hasSubFrames = activeFrameLayersLength > 0;

  return (
    <div className="mt-2 flex items-center space-x-2 border-dashed border-gray-300 rounded-sm">
      <div className="truncate">
        Selected subframe:
      </div>
      {hasSubFrames ? (
        <div className="flex items-center whitespace-nowrap">
          <NumberControl
            value={activeSubframeIndex !== null ? (activeSubframeIndex + 1) : null}
            setValue={(value) => setActiveSubframeIndex(value - 1)}
            min={1}
            max={activeFrameLayersLength}
          />
          <span className="font-mono">
            &nbsp;/&nbsp;
            {activeFrameLayersLength}
          </span>
        </div>
      ) : (
        <div className="whitespace-nowrap text-gray-400">
          No subframes
        </div>
      )}
    </div>
  );
}
