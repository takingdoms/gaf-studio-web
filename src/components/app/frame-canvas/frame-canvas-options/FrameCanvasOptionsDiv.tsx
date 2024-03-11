import BgSelectorModalContent from "@/components/app/frame-canvas/frame-canvas-options/BgSelectorModalContent";
import OptionButton from "@/components/app/frame-canvas/frame-canvas-options/OptionButton";
import { ModalContext } from "@/components/ui/modal/ModalContext";
import { Icons } from "@/lib/react/icons";
import React from "react";

export default function FrameCanvasOptionsDiv() {
  const modal = React.useContext(ModalContext);

  const onClickOptions = React.useCallback(async () => {
    // TODO show a dropdown on the OptionButton wih an option saying "Edit Background"
    // upon clicking that option the modal to choose the background is then shown
    const { close } = modal.pushModal({
      title: 'Change Background',
      body: <BgSelectorModalContent close={() => close()} />,
    });
  }, [modal]);

  return (
    <div className="flex space-x-2">
      <OptionButton
        icon={Icons.Options}
        label="Options"
        onClick={onClickOptions}
      />
    </div>
  );
}
