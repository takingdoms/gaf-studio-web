import ActivePairSubFormatSelector from "@/components/app/frame-content/frame-content-options/ActivePairSubFormatSelector";
import ExportImageButton from "@/components/app/frame-content/frame-content-options/ExportImageButton";
import OptionButton from "@/components/app/frame-content/frame-content-options/OptionButton";
import CanvasControls from "@/components/app/frame-content/frame-content-options/canvas-controls/CanvasControls";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function FrameContentOptionsDiv() {
  const format = S.useFormat();

  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        {format === 'taf-pair' && <ActivePairSubFormatSelector />}
      </div>

      <div className="flex-1">
        <CanvasControls />
      </div>

      <div className="flex-1 flex justify-end space-x-2">
        <ExportImageButton />
        <OptionButton />
      </div>
    </div>
  );
}
