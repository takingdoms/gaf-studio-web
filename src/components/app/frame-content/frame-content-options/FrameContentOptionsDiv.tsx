import ActivePairSubFormatSelector from "@/components/app/frame-content/frame-content-options/ActivePairSubFormatSelector";
import OptionButton from "@/components/app/frame-content/frame-content-options/OptionButton";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";

export default function FrameContentOptionsDiv() {
  const format = S.useFormat();

  return (
    <div className="flex space-x-2">
      <div className="grow">
        {format === 'taf-pair' && <ActivePairSubFormatSelector />}
      </div>

      <OptionButton />
    </div>
  );
}
