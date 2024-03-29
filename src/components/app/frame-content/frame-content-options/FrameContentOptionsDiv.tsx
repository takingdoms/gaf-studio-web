import ActivePairSubFormatSelector from "@/components/app/frame-content/frame-content-options/ActivePairSubFormatSelector";
import BgSelectorModalContent from "@/components/app/frame-content/frame-content-options/BgSelectorModalContent";
import OptionButton from "@/components/app/frame-content/frame-content-options/OptionButton";
import { ModalContext } from "@/components/ui/modal/ModalContext";
import { Icons } from "@/lib/react/icons";
import { S } from "@/lib/state/workspace/workspace-context/any-workspace-helper";
import React from "react";

export default function FrameContentOptionsDiv() {
  const format = S.useFormat();

  const modal = React.useContext(ModalContext);

  const onClickOptions = React.useCallback(async () => {
    // TODO show a dropdown on the OptionButton wih an option saying "Edit Background"
    // upon clicking that option the modal to choose the background is then shown
    // Other things to put in the bottom: grid checkbox, DRAW_FRAME_BOUNDARIES radio buttons, etc
    const { close } = modal.pushModal({
      title: 'Change Background',
      body: <BgSelectorModalContent close={() => close()} />,
    });
  }, [modal]);

  return (
    <div className="flex space-x-2">
      <div className="grow">
        {format === 'taf-pair' && <ActivePairSubFormatSelector />}
      </div>

      <OptionButton
        icon={Icons.Options}
        label="Options"
        onClick={onClickOptions}
      />
    </div>
  );
}
